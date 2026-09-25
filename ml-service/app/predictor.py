import os
import joblib
import numpy as np
import pandas as pd
from typing import List, Dict, Any

class OutbreakPredictor:
    def __init__(self, model_path: str = None):
        if model_path is None:
            model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model.pkl')
        
        if not os.path.exists(model_path):
            # If model file does not exist, trigger auto-training
            from app.train import train_and_save_model
            output_dir = os.path.dirname(model_path)
            train_and_save_model(output_dir)
            
        artifact = joblib.load(model_path)
        self.model = artifact['model']
        self.feature_cols = artifact['feature_cols']
        self.metrics = artifact.get('metrics', {})

    def predict(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        # Extract features with sensible defaults
        recent_cases = float(payload.get('recentCases', 0))
        historical_cases = float(payload.get('historicalCases', recent_cases * 1.2))
        water_quality_score = float(payload.get('waterQualityScore', 70))
        turbidity = float(payload.get('turbidity', 1.5))
        ph = float(payload.get('ph', 7.0))
        temperature = float(payload.get('temperature', 28.0))
        month = int(payload.get('month', 6))
        rainfall = float(payload.get('rainfall', 50.0))
        population_density = float(payload.get('populationDensity', 400.0))

        # Build feature vector matching training order
        input_data = pd.DataFrame([{
            'recentCases': recent_cases,
            'historicalCases': historical_cases,
            'waterQualityScore': water_quality_score,
            'turbidity': turbidity,
            'ph': ph,
            'temperature': temperature,
            'month': month,
            'rainfall': rainfall,
            'populationDensity': population_density
        }])[self.feature_cols]

        # Predict class probabilities
        probs = self.model.predict_proba(input_data)[0]
        # Class mapping: 0: LOW, 1: MEDIUM, 2: HIGH, 3: CRITICAL
        predicted_class_idx = int(np.argmax(probs))
        class_names = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
        risk_level = class_names[predicted_class_idx]
        max_prob = float(np.max(probs))

        # Calculate continuous risk score (0-100) weighted by probabilities
        # Weights: LOW=12.5, MEDIUM=38, HIGH=63, CRITICAL=88
        class_weights = np.array([12.5, 38.0, 63.0, 88.0])
        # Ensure probs has length 4 if some classes were unobserved
        if len(probs) < 4:
            padded_probs = np.zeros(4)
            for idx, c in enumerate(self.model.classes_):
                padded_probs[c] = probs[idx]
            probs = padded_probs
            
        calculated_score = float(np.sum(probs * class_weights))
        calculated_score = round(np.clip(calculated_score, 0.0, 100.0), 1)

        # Re-verify risk_level alignment with exact threshold ranges:
        # 0-25: LOW, 26-50: MEDIUM, 51-75: HIGH, 76-100: CRITICAL
        if calculated_score <= 25.0:
            risk_level = "LOW"
        elif calculated_score <= 50.0:
            risk_level = "MEDIUM"
        elif calculated_score <= 75.0:
            risk_level = "HIGH"
        else:
            risk_level = "CRITICAL"

        # Identify key contributing factors dynamically
        factors = []
        if recent_cases >= 10:
            factors.append(f"Significant increase in recent cases ({int(recent_cases)} reported)")
        elif recent_cases >= 5:
            factors.append(f"Elevated recent cases ({int(recent_cases)} reported)")

        if water_quality_score < 45:
            factors.append(f"Critically low water quality score ({water_quality_score:.1f}/100)")
        elif water_quality_score < 65:
            factors.append(f"Sub-optimal water quality score ({water_quality_score:.1f}/100)")

        if turbidity > 5.0:
            factors.append(f"Elevated water turbidity level ({turbidity:.1f} NTU)")

        if ph < 6.5 or ph > 8.5:
            factors.append(f"Abnormal water pH level ({ph:.1f}) outside safe range (6.5-8.5)")

        if rainfall > 150:
            factors.append(f"High seasonal rainfall ({rainfall:.0f} mm) increasing runoff contamination risk")

        if not factors:
            factors.append("Environmental and epidemiological indicators are within normal parameters")

        disease_input = payload.get('disease', 'Diarrheal Disease')
        predicted_disease = disease_input if disease_input else 'Diarrheal Disease'

        return {
            "riskScore": calculated_score,
            "riskLevel": risk_level,
            "probability": round(max_prob, 3),
            "predictedDisease": predicted_disease,
            "factors": factors,
            "disclaimer": "AI-generated risk assessment is intended for public-health monitoring and decision support. It is not a medical diagnosis.",
            "modelVersion": "1.0.0-RandomForest"
        }
