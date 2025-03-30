from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Allowed file types: PNG, JPG, JPEG'}), 400

    try:
        # Read and validate image
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Preprocess image
        image = image.resize((256, 256))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # TODO: Replace with your actual model prediction
        # model = tf.keras.models.load_model('plant_disease_model.h5')
        # predictions = model.predict(img_array)
        # predicted_class = int(np.argmax(predictions, axis=1)[0])
        # confidence = float(np.max(predictions))
        
        # Mock response for testing
        predicted_class = 11  # Grape Black Rot
        confidence = 0.92    # Example confidence

        return jsonify({
            'predicted_class': predicted_class,
            'confidence': confidence,
            'status': 'success'
        })

    except Exception as e:
        return jsonify({'error': f'Image processing error: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)