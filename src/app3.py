from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from ultralytics import YOLO
from PIL import Image
import io
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
RESULTS_FOLDER = 'results'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PATH = 'best_3.pt'  
MIN_CONFIDENCE = 0.3  
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)

try:
    model = YOLO(MODEL_PATH)
    print(f"Model '{MODEL_PATH}' loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise e

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded', 'status': 'error'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file', 'status': 'error'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Allowed file types: PNG, JPG, JPEG', 'status': 'error'}), 400

    try:
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        results = model(img)
        
        if not results[0].boxes or len(results[0].boxes) == 0:
            return jsonify({
                'error': 'No plants detected - please upload a clear plant image',
                'status': 'no_detection'
            }), 200
        
        boxes = results[0].boxes
        valid_boxes = [box for box in boxes if box.conf >= MIN_CONFIDENCE]
        
        if not valid_boxes:
            return jsonify({
                'error': f'No confident detections (confidence < {MIN_CONFIDENCE})',
                'status': 'low_confidence'
            }), 200
        
        best_box = max(valid_boxes, key=lambda box: box.conf)
        class_id = int(best_box.cls)
        class_name = model.names[class_id]
        confidence = float(best_box.conf)
        
        output_img = results[0].plot()
        output_img = Image.fromarray(output_img[..., ::-1])  
        
        output_filename = secure_filename(file.filename)
        output_path = os.path.join(RESULTS_FOLDER, output_filename)
        output_img.save(output_path)
        
        response = {
            'plant_name': class_name,
            'confidence': confidence,
            'image_url': f'/results/{output_filename}',
            'status': 'success'
        }
        
        return jsonify(response)
    
    except Exception as e:
        app.logger.error(f"Error during prediction: {str(e)}")
        return jsonify({
            'error': 'Failed to process image',
            'status': 'error',
            'details': str(e)
        }), 500

@app.route('/results/<filename>')
def serve_result(filename):
    return send_from_directory(RESULTS_FOLDER, filename)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,
        'min_confidence': MIN_CONFIDENCE
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)