from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/predict": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["POST"],
        "allow_headers": ["*"]
    }
})

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model
try:
    model = load_model('my_model.h5')
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Class names mapping (must match your model's output classes)
CLASS_NAMES = {
    0: 'Alluvial',
    1: 'Black',
    2: 'Clay', 
    3: 'Red'
}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_image(file_stream):
    try:
        img = Image.open(file_stream)
        img.verify()
        file_stream.seek(0)
        return True
    except Exception:
        return False

def preprocess_image(img_path, target_size=(150, 150)):
    """Preprocess image to match model training"""
    try:
        img = image.load_img(img_path, target_size=target_size)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Normalize as done during training
        return img_array
    except Exception as e:
        raise ValueError(f"Image preprocessing failed: {str(e)}")

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not loaded'}), 500
    
    # Check if image was uploaded
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    
    # Validate file
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({
            'error': 'Invalid file type. Only JPG, JPEG, PNG allowed (max 5MB)'
        }), 400
    
    if not validate_image(file.stream):
        return jsonify({'error': 'Invalid or corrupted image file'}), 400
    
    try:
        # Save temporarily
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Preprocess and predict
        processed_image = preprocess_image(filepath)
        predictions = model.predict(processed_image)
        
        # Validate prediction
        if predictions.size == 0 or np.isnan(predictions).any():
            raise ValueError("Model returned invalid predictions")
        
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))
        
        # Get class name
        class_name = CLASS_NAMES.get(predicted_class_idx, "Unknown")
        
        # Ensure confidence is valid
        if not 0 <= confidence <= 1:
            confidence = 0.0
        
        # Clean up
        os.remove(filepath)
        
        return jsonify({
            'class': class_name,
            'confidence': confidence
        })
        
    except Exception as e:
        # Clean up if file was saved
        if 'filepath' in locals() and os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({
            'error': f"Prediction failed: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'classes': list(CLASS_NAMES.values()),
        'message': 'Soil classification API is running'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)