import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
from datetime import datetime

class PricePredictor:
    def __init__(self):
        self.models = {}
        self.encoders = {
            'season': LabelEncoder(),
            'product': LabelEncoder()
        }
    
    def load_data(self, filename='price_data.csv'):
        data = pd.read_csv(filename)
        data['date'] = pd.to_datetime(data['date'])
        data['year'] = data['date'].dt.year
        data['month'] = data['date'].dt.month
        data['season'] = self.encoders['season'].fit_transform(data['season'])
        data['product'] = self.encoders['product'].fit_transform(data['product'])
        return data
    
    def train(self):
        data = self.load_data()
        
        # Train separate models for each product
        for product in data['product'].unique():
            product_data = data[data['product'] == product]
            X = product_data[['year', 'month', 'season', 'demand', 'supply']]
            
            self.models[product] = {
                'avg': RandomForestRegressor(n_estimators=100, random_state=42).fit(X, product_data['avg_price']),
                'min': RandomForestRegressor(n_estimators=100, random_state=42).fit(X, product_data['min_price']),
                'max': RandomForestRegressor(n_estimators=100, random_state=42).fit(X, product_data['max_price'])
            }
    
    def predict(self, product, season, demand, supply):
        now = datetime.now()
        try:
            product_encoded = self.encoders['product'].transform([product])[0]
            season_encoded = self.encoders['season'].transform([season])[0]
            features = [[now.year, now.month, season_encoded, demand, supply]]
            
            return {
                'product': product,
                'avg_price': round(self.models[product_encoded]['avg'].predict(features)[0], 2),
                'min_price': round(self.models[product_encoded]['min'].predict(features)[0], 2),
                'max_price': round(self.models[product_encoded]['max'].predict(features)[0], 2),
                'trend_up': 1.5,
                'trend_down': 1.0
            }
        except ValueError as e:
            print(f"Prediction error for {product}: {str(e)}")
            return None

def train_and_save_model():
    predictor = PricePredictor()
    predictor.train()
    joblib.dump(predictor, 'price_predictor.joblib')

if __name__ == "__main__":
    train_and_save_model()