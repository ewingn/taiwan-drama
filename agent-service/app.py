"""
TaiwanScript Agent Service
Flask API that exposes Xiao Ai agent to Next.js frontend
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from agents.xiao_ai_agent import XiaoAiAgent

load_dotenv()

app = Flask(__name__)
CORS(app)

# Store active agent sessions (in production, use Redis)
active_sessions = {}

# Initialize project config
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT")
LOCATION = os.getenv("VERTEX_AI_LOCATION", "us-central1")


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "taiwanscript-agent"})


@app.route('/agent/start', methods=['POST'])
def start_conversation():
    """
    Start a new conversation with Xiao Ai
    
    Request body:
    {
        "user_id": "firebase_user_id",
        "chapter_id": 1,
        "chapter_context": {
            "title": "...",
            "scenario": "...",
            ...
        }
    }
    """
    data = request.json
    user_id = data.get("user_id")
    chapter_context = data.get("chapter_context")
    
    if not user_id or not chapter_context:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        # Create new agent session
        session_id = f"{user_id}_{chapter_context['id']}_{int(time.time())}"
        
        agent = XiaoAiAgent(project_id=PROJECT_ID, location=LOCATION)
        greeting = agent.start_conversation(chapter_context, user_id)
        
        # Store session
        active_sessions[session_id] = agent
        
        return jsonify({
            "session_id": session_id,
            "greeting": greeting,
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/agent/message', methods=['POST'])
def send_message():
    """
    Send a message to the agent
    
    Request body:
    {
        "session_id": "...",
        "message": "你好！我是新學生"
    }
    """
    data = request.json
    session_id = data.get("session_id")
    message = data.get("message")
    
    if not session_id or not message:
        return jsonify({"error": "Missing required fields"}), 400
    
    # Get agent session
    agent = active_sessions.get(session_id)
    if not agent:
        return jsonify({"error": "Session not found"}), 404
    
    try:
        response = agent.send_message(message)
        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/agent/history', methods=['GET'])
def get_history():
    """Get conversation history"""
    session_id = request.args.get("session_id")
    
    agent = active_sessions.get(session_id)
    if not agent:
        return jsonify({"error": "Session not found"}), 404
    
    history = agent.get_conversation_history()
    return jsonify({"history": history})


@app.route('/agent/end', methods=['POST'])
def end_conversation():
    """End conversation and cleanup"""
    data = request.json
    session_id = data.get("session_id")
    
    if session_id in active_sessions:
        del active_sessions[session_id]
        return jsonify({"success": True})
    
    return jsonify({"error": "Session not found"}), 404


if __name__ == '__main__':
    import time
    app.run(host='0.0.0.0', port=8080, debug=True)