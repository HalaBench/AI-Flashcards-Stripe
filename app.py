from flask import Flask, request, jsonify
# import PyPDF2

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def uploadpdf():
    return jsonify({"message": "pdf server is running"}), 200

def upload_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith('.pdf'):
        pdf_reader = PyPDF2.PdfReader(file.stream)
        text = []
        for page in pdf_reader.pages:
            text.append(page.extract_text())
        return jsonify({"content": "\n".join(text)}), 200
    else:
        return jsonify({"error": "Invalid file format"}), 400
    
@app.route('/api/health', methods=['POST', 'GET'])
def health():
    return jsonify({"message": "Flask server is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=500)
