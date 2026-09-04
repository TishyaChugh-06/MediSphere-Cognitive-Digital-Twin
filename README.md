# MediSphere Cognitive Twin

**Milestone 1: FHIR Integration & Twin Foundation**

A modern healthcare platform built with **Java 25**, **Spring Boot 4**, **Angular 20**, **MongoDB**, and **Apache Kafka**, implementing FHIR R4 standards with digital health twin capabilities.

## Project Structure

```
MediSphere-Cognitive-Twin/
├── backend/              # Spring Boot backend (Java 25)
├── frontend/             # Angular 20 frontend (TypeScript)
├── sample-data/          # FHIR R4 sample data and wearables
├── docker/               # Docker & Kubernetes configurations
├── docs/                 # Architecture, API docs, screenshots
├── README.md             # This file
└── .gitignore            # Git ignore rules
```

## Milestone 1: FHIR Integration & Twin Foundation

### Core Components

1. **Patient Data** - Patient resource management
2. **FHIR R4 API Integration** - FHIR standards compliance
3. **MongoDB Patient Twin Store** - Persistent data layer
4. **Digital Health Twin Foundation** - Twin data models
5. **Patient 360 Dashboard** - Unified patient view
6. **Kafka Vitals Streaming Foundation** - Real-time vitals
7. **Patient Consent Management** - Consent tracking
8. **HIPAA-oriented Audit Logging** - Compliance audit trails
9. **RBAC Foundation** - Role-based access control
10. **Validation Framework** - Data validation

## Technology Stack

### Backend
- **Java 25**
- **Spring Boot 4**
- **Maven** (Build tool)

### Frontend
- **Angular 20**
- **TypeScript**
- **HTML & CSS**

### Database & Messaging
- **MongoDB** (Patient twin store)
- **Apache Kafka** (Vitals streaming)

### Standards & Healthcare
- **FHIR R4** (Fast Healthcare Interoperability Resources)
- **SMART on FHIR** (Foundation for future phases)

### Infrastructure
- **Docker** (Containerization)
- **Kubernetes** (Orchestration - future)

## Project Setup

### Prerequisites
- Java 25 JDK
- Maven 3.8+
- Node.js 24+
- npm 11+
- Angular CLI 20+
- Git
- Docker Desktop
- MongoDB
- Apache Kafka

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MediSphere-Cognitive-Twin
   ```

2. **Backend Setup**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ng serve
   ```

## Development Workflow

### Backend Development
- Package structure: `com.medisphere.*`
- Controllers → Services → Repositories → Models
- FHIR integration in `fhir/` package
- Kafka producers/consumers in `kafka/` package

### Frontend Development
- Components in `src/app/components/`
- Pages in `src/app/pages/`
- Services in `src/app/services/`
- Models in `src/app/models/`

## API Documentation

See [docs/api](docs/api) for detailed API documentation.

## Architecture Diagrams

See [docs/architecture](docs/architecture) for architecture diagrams.

## Sample Data

FHIR R4 sample data available in [sample-data/fhir](sample-data/fhir).

## Status

🚀 **Milestone 1 - In Progress**

Future milestones include:
- ML/AI models (TensorFlow Federated)
- CVD & Diabetes predictions
- Anomaly detection
- SHAP explainability
- Care plan generation

## License

[Your License Here]

## Contact

[Your Contact Info]
