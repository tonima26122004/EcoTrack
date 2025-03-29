from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import tensorflow as tf

# Disable GPU to avoid CUDA errors on Render
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load your ML model
try:
    model = tf.keras.models.load_model('plant_disease_model.h5')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:  # Changed from 'image' to 'file'
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']  # Changed from 'image' to 'file'
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save the file temporarily to process it
        temp_path = "temp_image.jpg"
        file.save(temp_path)
        
        img = tf.keras.preprocessing.image.load_img(temp_path, target_size=(256, 256))
        img_array = tf.keras.preprocessing.image.img_to_array(img) / 255.0
        img_array = tf.expand_dims(img_array, axis=0)
        
        # Clean up the temp file
        os.remove(temp_path)
    except Exception as e:
        return jsonify({'error': f'Invalid image file: {e}'}), 400

    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        predictions = model.predict(img_array)
        predicted_class = int(np.argmax(predictions, axis=1)[0])
        confidence = float(np.max(predictions))
        return jsonify({
            'predicted_class': predicted_class, 
            'confidence': confidence,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': f'Prediction error: {e}'}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "model_loaded": model is not None})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)