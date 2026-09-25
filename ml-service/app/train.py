import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

def generate_synthetic_data(num_samples=3000, random_state=42):
    np.random.seed(random_state)
    
    # Generate realistic epidemiological & environmental features across 4 target risk profiles
    samples_per_class = num_samples // 4
    
    # Class 0: LOW Risk
    cases_low = np.random.randint(0, 3, size=samples_per_class)
    hist_low = cases_low * 1.1 + np.random.randint(1, 4, size=samples_per_class)
    wq_low = np.random.uniform(75, 98, size=samples_per_class)
    turb_low = np.random.uniform(0.5, 3.0, size=samples_per_class)
    ph_low = np.random.uniform(6.8, 7.6, size=samples_per_class)
    temp_low = np.random.uniform(22, 30, size=samples_per_class)
    month_low = np.random.randint(1, 13, size=samples_per_class)
    rain_low = np.random.uniform(10, 80, size=samples_per_class)
    pop_low = np.random.uniform(100, 600, size=samples_per_class)
    y_low = np.zeros(samples_per_class, dtype=int)

    # Class 1: MEDIUM Risk
    cases_med = np.random.randint(3, 7, size=samples_per_class)
    hist_med = cases_med * 1.3 + np.random.randint(2, 6, size=samples_per_class)
    wq_med = np.random.uniform(55, 74, size=samples_per_class)
    turb_med = np.random.uniform(3.1, 5.5, size=samples_per_class)
    ph_med = np.random.uniform(6.2, 8.2, size=samples_per_class)
    temp_med = np.random.uniform(25, 33, size=samples_per_class)
    month_med = np.random.randint(1, 13, size=samples_per_class)
    rain_med = np.random.uniform(50, 140, size=samples_per_class)
    pop_med = np.random.uniform(300, 800, size=samples_per_class)
    y_med = np.ones(samples_per_class, dtype=int)

    # Class 2: HIGH Risk
    cases_high = np.random.randint(7, 14, size=samples_per_class)
    hist_high = cases_high * 1.5 + np.random.randint(4, 10, size=samples_per_class)
    wq_high = np.random.uniform(35, 54, size=samples_per_class)
    turb_high = np.random.uniform(5.6, 9.0, size=samples_per_class)
    ph_high = np.random.uniform(5.8, 8.8, size=samples_per_class)
    temp_high = np.random.uniform(28, 36, size=samples_per_class)
    month_high = np.random.randint(5, 10, size=samples_per_class) # Monsoon peak
    rain_high = np.random.uniform(120, 250, size=samples_per_class)
    pop_high = np.random.uniform(500, 1000, size=samples_per_class)
    y_high = np.full(samples_per_class, 2, dtype=int)

    # Class 3: CRITICAL Risk
    cases_crit = np.random.randint(14, 30, size=samples_per_class)
    hist_crit = cases_crit * 1.8 + np.random.randint(8, 20, size=samples_per_class)
    wq_crit = np.random.uniform(15, 34, size=samples_per_class)
    turb_crit = np.random.uniform(9.1, 18.0, size=samples_per_class)
    ph_crit = np.random.choice([np.random.uniform(4.5, 5.7), np.random.uniform(8.9, 9.8)], size=samples_per_class)
    temp_crit = np.random.uniform(30, 39, size=samples_per_class)
    month_crit = np.random.randint(6, 10, size=samples_per_class)
    rain_crit = np.random.uniform(200, 400, size=samples_per_class)
    pop_crit = np.random.uniform(700, 1500, size=samples_per_class)
    y_crit = np.full(samples_per_class, 3, dtype=int)

    # Combine
    df = pd.DataFrame({
        'recentCases': np.concatenate([cases_low, cases_med, cases_high, cases_crit]),
        'historicalCases': np.concatenate([hist_low, hist_med, hist_high, hist_crit]),
        'waterQualityScore': np.concatenate([wq_low, wq_med, wq_high, wq_crit]),
        'turbidity': np.concatenate([turb_low, turb_med, turb_high, turb_crit]),
        'ph': np.concatenate([ph_low, ph_med, ph_high, ph_crit]),
        'temperature': np.concatenate([temp_low, temp_med, temp_high, temp_crit]),
        'month': np.concatenate([month_low, month_med, month_high, month_crit]),
        'rainfall': np.concatenate([rain_low, rain_med, rain_high, rain_crit]),
        'populationDensity': np.concatenate([pop_low, pop_med, pop_high, pop_crit]),
        'riskLevel': np.concatenate([y_low, y_med, y_high, y_crit])
    })
    
    # Shuffle
    df = df.sample(frac=1.0, random_state=random_state).reset_index(drop=True)
    return df

def train_and_save_model(output_dir):
    os.makedirs(output_dir, exist_ok=True)
    df = generate_synthetic_data()
    
    feature_cols = [
        'recentCases', 'historicalCases', 'waterQualityScore', 
        'turbidity', 'ph', 'temperature', 'month', 'rainfall', 'populationDensity'
    ]
    X = df[feature_cols]
    y = df['riskLevel']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    model = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')
    cm = confusion_matrix(y_test, y_pred)
    
    print("=== MODEL EVALUATION METRICS ===")
    print(f"Accuracy:  {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall:    {recall:.4f}")
    print(f"F1-Score:  {f1:.4f}")
    print("Confusion Matrix:\n", cm)
    print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']))
    
    model_artifact = {
        'model': model,
        'feature_cols': feature_cols,
        'metrics': {
            'accuracy': float(accuracy),
            'precision': float(precision),
            'recall': float(recall),
            'f1_score': float(f1)
        }
    }
    
    model_path = os.path.join(output_dir, 'model.pkl')
    joblib.dump(model_artifact, model_path)
    print(f"\nModel successfully saved to {model_path}")
    return model_artifact

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    train_and_save_model(current_dir)
