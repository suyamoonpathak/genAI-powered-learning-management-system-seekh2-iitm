from flask import Flask, request, jsonify
from flask import Flask, render_template, request, jsonify
from sentence_transformers import SentenceTransformer
from src.vector_store import VectorStore
import numpy as np
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin

# Load environment variables from .env file
load_dotenv()
# Initialize the Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Load the FAISS index and embeddings
dimension = 512
vector_store = VectorStore(dimension)
vector_store.load_index("faiss_index.bin")

# Load the SentenceTransformer model for query embeddings
model_name = 'sentence-transformers/all-MiniLM-L6-v2'
encoder = SentenceTransformer(model_name)

# Load the text chunks (for context retrieval)
text_chunks = np.load("text_chunks.npy", allow_pickle=True)



generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}


# Function to interact with Gemini API
def generate_response(prompt):
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    response = model.generate_content(prompt)
    return response.text



app = Flask(__name__)
CORS(app)



@app.route('/ask', methods=['POST'])
@cross_origin(origin='*')
def ask():
    user_input = request.json['question']
    chat_history = request.json.get('chatHistory', '')

    query_embedding = encoder.encode([user_input])
    D, I = vector_store.search(query_embedding, k=5)

    # Retrieve top result content for context
    top_result_content = " ".join([text_chunks[idx] for idx in I[0]])
    print(top_result_content)

    # Generate prompt with context and chat history
    prompt = f"Context: {top_result_content}\nChat History:\n{chat_history} Note: Answer the questions as if you are a sales person and don't make it look like you are just summarizing from a vector embedding. User: {user_input}\nBot:"

    # Get response from Gemini API
    response = generate_response(prompt)

    

    return jsonify({'response': response})




@app.route('/summarize', methods=['POST'])
@cross_origin(origin='*')
def summarize():
    data = request.get_json()
    transcript = data.get('transcript')
    
    if not transcript:
        return jsonify({'error': 'No transcript provided'}), 400

    try:
        prompt = f"Summarize the following text: {transcript},this is the transcript of a video lecture, state the key points in a concise manner."
        response = generate_response(prompt)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
