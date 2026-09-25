import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import uvicorn
from predictor import OutbreakPredictor

app = FastAPI(
    title="Smart Community Health Monitoring - AI ML Microservice",
    description="Machine Learning Outbreak Risk Prediction Microservice for Water-Borne Disease Surveillance",
    version="1.0.0"
)

predictor = OutbreakPredictor()

class PredictRequest(BaseModel):
    district: Optional[str] = "Hyderabad"
    mandal: Optional[str] = "Amberpet"
    village: Optional[str] = "Amberpet Central"
    recentCases: Optional[float] = 5.0
    waterQualityScore: Optional[float] = 65.0
    rainfallMm: Optional[float] = 120.0
    temperatureC: Optional[float] = 28.5
    ph: Optional[float] = 6.2
    turbidity: Optional[float] = 8.5
    disease: Optional[str] = "Diarrheal Disease"

@app.get("/")
def read_root():
    return {
        "service": "Smart Health Monitoring AI Microservice",
        "status": "ONLINE",
        "version": "1.0.0",
        "endpoints": ["/health", "/api/ml/predict"]
    }

@app.get("/health")
def health_check():
    return {"status": "HEALTHY", "modelLoaded": True}

@app.post("/api/ml/predict")
def predict_outbreak_risk(payload: PredictRequest):
    try:
        data_dict = {
            "district": payload.district,
            "mandal": payload.mandal,
            "village": payload.village,
            "recentCases": payload.recentCases,
            "waterQualityScore": payload.waterQualityScore,
            "turbidity": payload.turbidity,
            "ph": payload.ph,
            "temperature": payload.temperatureC,
            "rainfall": payload.rainfallMm,
            "disease": payload.disease
        }
        res = predictor.predict(data_dict)
        res["districtName"] = payload.district
        res["mandalName"] = payload.mandal
        res["villageName"] = payload.village
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
