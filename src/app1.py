from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from datetime import datetime

app = Flask(__name__)
CORS(app)

try:
    predictor = joblib.load('price_predictor.joblib')
except:
    from price_predictor import PricePredictor
    predictor = PricePredictor()
    predictor.train()
    joblib.dump(predictor, 'price_predictor.joblib')

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify({
        'products': ['Rice', 'Wheat', 'Corn', 'Potato']
    })

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prediction = predictor.predict(
        product=data.get('product', 'Rice'),
        season=data.get('season', 'Winter'),
        demand=data.get('demand', 1500),
        supply=data.get('supply', 1200)
    )
    
    if not prediction:
        return jsonify({'error': 'Product not found'}), 404
    
    def format_price(price):
        return f"₹{price:,.2f} per quintal (₹{price/100:,.2f} per kg)"
    
    return jsonify({
        'product': prediction['product'],
        'avg_price': format_price(prediction['avg_price']),
        'min_price': format_price(prediction['min_price']),
        'max_price': format_price(prediction['max_price']),
        'trend_up': prediction['trend_up'],
        'trend_down': prediction['trend_down']
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)