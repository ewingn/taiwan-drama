"""
TaiwanScript Agent Service
Flask API that exposes Xiao Ai agent to Next.js frontend, secured with Firebase Auth.
"""

import os
import time
import json
from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from agents.xiao_ai_agent import XiaoAiAgent

# NEW FIREBASE ADMIN IMPORTS (Requires: pip install firebase-admin)
import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin.exceptions import FirebaseError

load_dotenv()

app = Flask(__name__)
# Configure CORS to allow interaction from your Next.js frontend domain
CORS(app, supports_credentials=True) 

# Store active agent sessions (in production, use Redis)
active_sessions = {}

# Initialize project config (These should be set in your .env file)
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT")
LOCATION = os.getenv("VERTEX_AI_LOCATION", "us-central1")

# ----------------------------------------------------
# 🔐 FIREBASE ADMIN SETUP & TOKEN VERIFICATION
# ----------------------------------------------------

# Initialize the Firebase Admin SDK using Application Default Credentials.
# This assumes the GOOGLE_APPLICATION_CREDENTIALS environment variable is set
# to the path of your Firebase Admin SDK service account JSON file.
try:
    if not firebase_admin._apps:
        cred = credentials.ApplicationDefault() 
        firebase_admin.initialize_app(cred)
    print("Firebase Admin SDK initialized successfully.")
except Exception as e:
    # This block keeps the app running for local testing even if auth isn't fully set up,
    # but prints a strong warning.
    print(f"FATAL WARNING: Firebase Admin SDK failed to initialize: {e}")
    print("Authentication endpoints are INSECURE/INOPERABLE without a valid service account.")

def verify_token(f):
    """Decorator to verify Firebase ID Token in the Authorization header."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # 1. Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Missing or malformed Authorization header"}), 401
        
        id_token = auth_header.split('Bearer ')[1]
        
        try:
            # 2. Verify the token using Firebase Admin SDK
            claims = auth.verify_id_token(id_token)
            
            # Pass the verified UID to the endpoint function securely
            request.verified_uid = claims['uid']
            
        except FirebaseError as e:
            # Handle specific Firebase auth errors (e.g., expired token)
            print(f"Firebase Authentication Error: {e}")
            return jsonify({"error": "Unauthorized: Invalid or expired token"}), 401
        except Exception as e:
            # Handle general errors (e.g., missing claims)
            print(f"Authentication Failed: {e}")
            return jsonify({"error": "Unauthorized: General verification failure"}), 401
            
        return f(*args, **kwargs)
    return decorated_function

# ----------------------------------------------------
# 🌐 ENDPOINTS (ALL PROTECTED EXCEPT HEALTH CHECK)
# ----------------------------------------------------

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "taiwanscript-agent"})


@app.route('/agent/start', methods=['POST'])
@verify_token # 👈 SECURED ENDPOINT
def start_conversation():
    """Start a new conversation with Xiao Ai using verified user context."""
    data = request.json
    
    # SECURE: Use the verified UID from the token claims
    user_id = request.verified_uid 
    
    chapter_context = data.get("chapter_context")
    
    if not chapter_context:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        # Generate session ID using the SECURE user_id
        session_id = f"{user_id}_{chapter_context.get('id', 'unknown')}_{int(time.time())}"
        
        agent = XiaoAiAgent(project_id=PROJECT_ID, location=LOCATION)
        
        # Pass the context for grounding the AI's persona and RAG tool use
        greeting = agent.start_conversation(chapter_context, user_id)
        
        active_sessions[session_id] = agent
        
        return jsonify({
            "session_id": session_id,
            "greeting": greeting,
        })
        
    except Exception as e:
        print(f"Error starting conversation: {e}")
        return jsonify({"error": "Internal server error starting agent."}), 500


@app.route('/agent/message', methods=['POST'])
@verify_token # 👈 SECURED ENDPOINT
def send_message():
    """Send a message to the agent."""
    data = request.json
    session_id = data.get("session_id")
    message = data.get("message")
    
    if not session_id or not message:
        return jsonify({"error": "Missing required fields"}), 400
    
    agent = active_sessions.get(session_id)
    if not agent:
        return jsonify({"error": "Session not found or expired"}), 404
    
    try:
        response = agent.send_message(message)
        return jsonify(response)
        
    except Exception as e:
        print(f"Error sending message: {e}")
        return jsonify({"error": "Internal server error processing message."}), 500


@app.route('/agent/history', methods=['GET'])
@verify_token # 👈 SECURED ENDPOINT
def get_history():
    """Get conversation history."""
    session_id = request.args.get("session_id")
    
    agent = active_sessions.get(session_id)
    if not agent:
        return jsonify({"error": "Session not found or expired"}), 404
    
    history = agent.get_conversation_history()
    return jsonify({"history": history})


@app.route('/agent/end', methods=['POST'])
@verify_token # 👈 SECURED ENDPOINT
def end_conversation():
    """End conversation and cleanup."""
    data = request.json
    session_id = data.get("session_id")
    
    if session_id in active_sessions:
        # Note: In a real environment, you'd call a cleanup method on the agent object
        del active_sessions[session_id]
        return jsonify({"success": True})
    
    return jsonify({"error": "Session not found"}), 404


if __name__ == '__main__':
    # Running this on a port accessible by your Next.js client
    # NOTE: Set debug=False in production!
    app.run(host='0.0.0.0', port=8080, debug=True)
