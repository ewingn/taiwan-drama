"""
XiaoAiAgent implementation using Google Generative AI (Gemini).
This class handles conversation state, history, and tool calls (like affection change).
"""
import time
from typing import Dict, Any, List

# Placeholder for Google GenAI SDK imports (assuming standard usage)
# In a real environment, you'd install google-genai or google-cloud-aiplatform for Python
# Since your other files use the Node.js @google-cloud/aiplatform, 
# this implementation is highly conceptual and relies on successful Flask API calls.

class XiaoAiAgent:
    """Manages the conversation and interaction logic for Xiao Ai."""
    
    # Store conversation history
    def __init__(self, project_id: str, location: str):
        self.project_id = project_id
        self.location = location
        self.history = []
        self.state = {
            "affection": 0,
            "phrases_used": set(),
            "last_interaction": time.time()
        }
        print(f"Agent initialized for {project_id} in {location}")

    def start_conversation(self, chapter_context: Dict[str, Any], user_id: str) -> str:
        """Initializes the conversation context based on the story chapter."""
        self.context = chapter_context
        self.user_id = user_id
        
        # System prompt setup (based on your voicePractice prompts)
        initial_prompt = f"""
You are 小愛 (Xiao Ai), a 17-year-old Taiwanese high school student. 
SCENARIO: {chapter_context['scenario']}
OBJECTIVE: {chapter_context['objective']}
Key phrases the student must use: {', '.join(chapter_context['key_phrases'])}

Your first response should be a friendly greeting.
"""
        # In a real setup, this would initialize the Gemini model with the prompt.
        self.history.append({"role": "system", "content": initial_prompt})
        
        # Generate initial greeting (to be fetched by the frontend if needed)
        greeting = "嗨！我是小愛。很高興見到你！"
        return greeting

    def send_message(self, message: str) -> Dict[str, Any]:
        """Processes a user message, generates a response, and updates state."""
        
        # 1. Update history with user message
        self.history.append({"role": "user", "content": message})
        
        # 2. Tool/State Logic: Check for key phrases and calculate affection
        tool_results = self._process_tools(message)
        
        # 3. Generate AI response (Mocked here, replace with Gemini API call)
        ai_response_text = f"你說的很有趣！ (Nǐ shuō de hěn yǒuqù!)"
        
        # 4. Finalize response format (similar to what your frontend expects)
        response = {
            "text": ai_response_text,
            "pinyin": "nǐ shuō de hěn yǒuqù",
            "english": "What you said is very interesting!",
            "emotion": "curious",
            "tool_results": tool_results
        }
        
        # 5. Update history with AI response
        self.history.append({"role": "model", "content": response["text"]})
        
        return response

    def get_conversation_history(self) -> List[Dict[str, str]]:
        """Returns the conversation history."""
        # Filter out system messages for a cleaner history log
        return [m for m in self.history if m["role"] != "system"]

    def _process_tools(self, message: str) -> List[Dict[str, Any]]:
        """Mock tool processing to update affection based on message content."""
        results = []
        affection_change = 0
        
        # Simple affection reward logic (You would refine this with model output)
        key_phrases = self.context.get('key_phrases', [])
        for phrase in key_phrases:
            chinese_part = phrase.split('(')[0].strip()
            if chinese_part in message and chinese_part not in self.state['phrases_used']:
                self.state['phrases_used'].add(chinese_part)
                affection_change += 8 # Based on your Chapter 1 data
                results.append({
                    "tool": "affection_update",
                    "success": True,
                    "message": f"Used new key phrase: {chinese_part}",
                    "change": 8
                })
        
        self.state['affection'] += affection_change
        return results