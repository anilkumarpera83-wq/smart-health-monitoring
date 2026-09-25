-- Smart Community Health Monitoring & Early Warning System Database Schema
-- Compatible with MySQL 8.0+ and H2 Database

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS states (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS districts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    state_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20),
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
    UNIQUE(state_id, name)
);

CREATE TABLE IF NOT EXISTS mandals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    district_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE,
    UNIQUE(district_id, name)
);

CREATE TABLE IF NOT EXISTS villages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mandal_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    population INT DEFAULT 1000,
    latitude DOUBLE,
    longitude DOUBLE,
    FOREIGN KEY (mandal_id) REFERENCES mandals(id) ON DELETE CASCADE,
    UNIQUE(mandal_id, name)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL,
    state_id BIGINT,
    district_id BIGINT,
    mandal_id BIGINT,
    village_id BIGINT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (mandal_id) REFERENCES mandals(id),
    FOREIGN KEY (village_id) REFERENCES villages(id)
);

CREATE TABLE IF NOT EXISTS diseases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) DEFAULT 'Water-Borne',
    description TEXT,
    severity VARCHAR(50) DEFAULT 'MEDIUM',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS symptoms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS health_cases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    case_number VARCHAR(50) NOT NULL UNIQUE,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    state_id BIGINT NOT NULL,
    district_id BIGINT NOT NULL,
    mandal_id BIGINT NOT NULL,
    village_id BIGINT NOT NULL,
    reporting_date DATE NOT NULL,
    suspected_disease_id BIGINT,
    confirmed_disease_id BIGINT,
    severity VARCHAR(50) NOT NULL,
    body_temperature DOUBLE,
    duration_days INT,
    water_source VARCHAR(100),
    notes TEXT,
    reported_by_user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (mandal_id) REFERENCES mandals(id),
    FOREIGN KEY (village_id) REFERENCES villages(id),
    FOREIGN KEY (suspected_disease_id) REFERENCES diseases(id),
    FOREIGN KEY (confirmed_disease_id) REFERENCES diseases(id),
    FOREIGN KEY (reported_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS case_symptoms (
    health_case_id BIGINT NOT NULL,
    symptom_id BIGINT NOT NULL,
    PRIMARY KEY (health_case_id, symptom_id),
    FOREIGN KEY (health_case_id) REFERENCES health_cases(id) ON DELETE CASCADE,
    FOREIGN KEY (symptom_id) REFERENCES symptoms(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS water_quality_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sample_code VARCHAR(50) NOT NULL UNIQUE,
    state_id BIGINT NOT NULL,
    district_id BIGINT NOT NULL,
    mandal_id BIGINT NOT NULL,
    village_id BIGINT NOT NULL,
    water_source VARCHAR(100) NOT NULL,
    collection_date DATE NOT NULL,
    ph DOUBLE NOT NULL,
    turbidity DOUBLE NOT NULL,
    temperature DOUBLE,
    tds DOUBLE,
    bacterial_contamination BOOLEAN DEFAULT FALSE,
    e_coli_status VARCHAR(50) DEFAULT 'ABSENT',
    overall_quality VARCHAR(50) NOT NULL,
    risk_level VARCHAR(50) NOT NULL,
    notes TEXT,
    submitted_by_user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (mandal_id) REFERENCES mandals(id),
    FOREIGN KEY (village_id) REFERENCES villages(id),
    FOREIGN KEY (submitted_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS alerts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    alert_code VARCHAR(50) NOT NULL UNIQUE,
    alert_type VARCHAR(50) NOT NULL,
    state_id BIGINT NOT NULL,
    district_id BIGINT NOT NULL,
    mandal_id BIGINT NOT NULL,
    village_id BIGINT NOT NULL,
    disease_id BIGINT,
    risk_level VARCHAR(50) NOT NULL,
    risk_score DOUBLE DEFAULT 0.0,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'NEW',
    assigned_officer_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (mandal_id) REFERENCES mandals(id),
    FOREIGN KEY (village_id) REFERENCES villages(id),
    FOREIGN KEY (disease_id) REFERENCES diseases(id),
    FOREIGN KEY (assigned_officer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ai_predictions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    state_id BIGINT NOT NULL,
    district_id BIGINT NOT NULL,
    mandal_id BIGINT NOT NULL,
    village_id BIGINT NOT NULL,
    disease_name VARCHAR(100) NOT NULL,
    risk_score DOUBLE NOT NULL,
    risk_level VARCHAR(50) NOT NULL,
    probability DOUBLE NOT NULL,
    contributing_factors TEXT,
    model_version VARCHAR(50) DEFAULT '1.0.0-RandomForest',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (district_id) REFERENCES districts(id),
    FOREIGN KEY (mandal_id) REFERENCES mandals(id),
    FOREIGN KEY (village_id) REFERENCES villages(id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    alert_id BIGINT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (alert_id) REFERENCES alerts(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id BIGINT,
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Default Roles
INSERT INTO roles (name) VALUES 
('ROLE_ADMIN'), 
('ROLE_HEALTH_OFFICER'), 
('ROLE_DOCTOR'), 
('ROLE_ASHA_WORKER'), 
('ROLE_COMMUNITY_VOLUNTEER');
