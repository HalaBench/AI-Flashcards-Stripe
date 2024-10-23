import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
from io import BytesIO
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/upload', methods=['POST', 'GET'])
def uploadpdf():
    print("found it KSDLFJSDL")
    return jsonify({"message": "pdf servr is running"}), 200

@app.route('/uploads', methods=['POST', 'GET'])
def uploadspdf():
    data = request.get_json()
    if 'pdf' not in data:
        return jsonify({"error": "No PDF data"}), 400

    pdf_data = base64.b64decode(data['pdf'])
    
    pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_data))
    text = []
    for page in pdf_reader.pages:
        print("sdkfljs", page.extract_text())
        text.append(page.extract_text())
    
    return jsonify({"content": "\n".join(text)}), 200
    

    
@app.route('/api/health', methods=['POST', 'GET'])
def health():
    return jsonify({"message": "Flask server is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5010)
