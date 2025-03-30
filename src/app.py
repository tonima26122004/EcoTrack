from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import numpy as np
import os
import tensorflow as tf  # Required import

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model and classes
try:
    model = tf.keras.models.load_model('plant_disease_model.h5')
    CLASS_NAMES = [
        'Apple Scab', 'Apple Black Rot', 'Apple Cedar Rust', 'Apple Healthy',
        'Blueberry Healthy', 'Cherry Powdery Mildew', 'Cherry Healthy',
        'Corn Gray Leaf Spot', 'Corn Common Rust', 'Corn Healthy',
        'Grape Black Rot', 'Grape Black Measles', 'Grape Leaf Blight', 'Grape Healthy'
        # Add all your classes here in order
    ]
    print("Model and classes loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded', 'status': 'error'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file', 'status': 'error'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Allowed file types: PNG, JPG, JPEG', 'status': 'error'}), 400

    if not model:
        return jsonify({'error': 'Model not loaded', 'status': 'error'}), 500

    try:
        # Read and validate image
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Preprocess image
        image = image.resize((256, 256))  # Match model's expected input
        img_array = np.array(image) / 255.0  # Normalize
        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        predictions = model.predict(img_array)
        predicted_class = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))
        class_name = CLASS_NAMES[predicted_class] if predicted_class < len(CLASS_NAMES) else f"Class {predicted_class}"

        # Validate confidence
        if confidence < 0.5:  # Adjust threshold as needed
            return jsonify({
                'error': 'Low confidence prediction - may not be a plant image',
                'predicted_class': predicted_class,
                'confidence': confidence,
                'class_name': class_name,
                'status': 'low_confidence'
            }), 200

        return jsonify({
            'predicted_class': predicted_class,
            'confidence': confidence,
            'class_name': class_name,
            'status': 'success'
        })

    except Exception as e:
        return jsonify({
            'error': f'Image processing error: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': bool(model),
        'classes_loaded': len(CLASS_NAMES) if model else 0
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)