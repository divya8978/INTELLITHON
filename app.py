from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image

app = Flask(__name__)
CORS(app)

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

@app.route("/analyze", methods=["POST"])
def analyze():
    print("REQUEST RECEIVED")  

    file = request.files["file"]
    image = Image.open(file)

    text = pytesseract.image_to_string(image)

    return jsonify({"text": text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)