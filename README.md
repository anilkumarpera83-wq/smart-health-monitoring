# Smart Community Health Monitoring & Early Warning System for Water-Borne Diseases

A full-stack, enterprise-grade public-health decision support platform for rural community surveillance, water quality monitoring, environmental contamination tracking, and machine-learning driven outbreak risk prediction across Telangana.

---

## 🏛️ Project Overview

Water-borne diseases such as Cholera, Typhoid, Hepatitis A, and Acute Gastroenteritis pose significant risks to rural public health. This system provides real-time surveillance, automated contamination detection, and predictive risk scoring to empower:
- **System Administrators**: Master command center and user access governance.
- **District Health Officers**: Outbreak cluster management and rapid response team deployment.
- **Medical Doctors**: Clinical diagnosis confirmation and symptom registry.
- **ASHA Workers**: Mobile-first field case entry with offline draft saving (`🟢 Online` / `🟠 Offline`).
- **Community Volunteers**: Village water sample testing (pH, turbidity, bacterial contamination, E. coli).

---

## 🏗️ Architecture & Technology Stack

```
                     +----------------------------------+
                     | React + Vite + TS Frontend (5173)|
                     +-----------------+----------------+
                                       |
                                REST API (JWT)
                                       v
                     +----------------------------------+
                     | Spring Boot Backend (Port 8080)  |
                     +--------+----------------+--------+
                              |                |
                HTTP RestTemplate              | JPA / Hibernate
                              v                v
      +-------------------------------+   +-----------------------------+
      | Python FastAPI ML (Port 8000) |   | MySQL / H2 Database (3306)  |
      +-------------------------------+   +-----------------------------+
```

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Recharts, Inter Font.
- **Backend Microservice**: Java 22 Spring Boot, Spring Security, JJWT, Spring Data JPA, H2 / MySQL.
- **AI/ML Microservice**: Python 3.13, FastAPI, Scikit-Learn (RandomForestClassifier), Pandas, Pydantic.
- **DevOps**: Docker Compose, Nginx, Multi-stage Dockerfiles.

---

## 🔑 Pre-Configured Seed Accounts

All accounts are pre-seeded with Telangana state, all 33 Telangana districts, mandals, and villages.

| Role | Email | Password | Access / Dashboard |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin@example.com` | `Admin@123` | Master System Command Center & Audit Logs |
| **District Health Officer** | `health@example.com` | `Health@123` | Outbreak Clusters & Early Warning Alerts |
| **Medical Doctor** | `doctor@example.com` | `Doctor@123` | Clinical Surveillance & Lab Diagnoses |
| **ASHA Field Worker** | `asha@example.com` | `Asha@123` | Mobile Field Entry & Offline Draft Storage |
| **Community Volunteer** | `volunteer@example.com` | `Volunteer@123` | Village Water Quality Sample Testing |

---

## 🚀 Step-by-Step Running Guide

### 1. Launch Python FastAPI ML Microservice
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app/train.py   # Trains RandomForest model (Model saved to app/model.pkl)
python app/main.py    # Runs server on http://localhost:8000
```

### 2. Launch Spring Boot Backend Microservice
```bash
cd backend
mvn clean spring-boot:run
# Server runs on http://localhost:8080
# Swagger API Docs available at http://localhost:8080/swagger-ui.html
# H2 Console available at http://localhost:8080/h2-console
```

### 3. Launch React Vite Frontend Web Application
```bash
cd frontend
npm install
npm run dev
# Application accessible at http://localhost:5173
```

---

## 🐳 Docker Deployment

To launch all 4 microservices (MySQL, ML FastAPI, Spring Boot, Frontend Nginx) simultaneously:

```bash
cd docker
docker-compose up --build
```

---

## ⚠️ Mandatory Medical Disclaimer

> **Important**: AI-generated risk assessment is intended for public-health monitoring and decision support. It is not a medical diagnosis. All clinical decisions must be validated by licensed medical personnel.

---

## 📄 License
Government of Telangana - Department of Health & Family Welfare. All Rights Reserved.
