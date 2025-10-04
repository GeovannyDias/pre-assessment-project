# Account Management Microservice (asm-msa-account)

## Description
This microservice manages account-related operations following Clean Architecture principles.

## Technologies
- Java 21
- Spring Boot 3.2.0
- Maven
- MariaDB
- JUnit 5 & Mockito for testing
- OpenAPI/Swagger for documentation

## Project Structure
Following Clean Architecture principles as defined in STD_JAV_002:

```
📁 asm-msa-account/
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/com/company/asm/account/
│   │   │   ├── 📁 configuration/  # Spring Boot configurations
│   │   │   ├── 📁 controller/     # REST controllers
│   │   │   ├── 📁 domain/        # Domain entities
│   │   │   ├── 📁 exception/     # Custom exceptions
│   │   │   ├── 📁 repository/    # Data access layer
│   │   │   ├── 📁 service/       # Business logic
│   │   │   └── AccountApplication.java
│   │   └── 📁 resources/
│   └── 📁 test/
└── pom.xml
```

## Getting Started

### Prerequisites
- JDK 21+
- Maven 3.8+
- MariaDB

### Installation
1. Clone the repository
2. Configure database properties in `application.properties`
3. Run `mvn clean install`

### Running the Application
```bash
mvn spring-boot:run
```

### API Documentation
Once running, access the Swagger UI at:
- http://localhost:8080/api/v1/swagger-ui.html

## Testing
Run tests with:
```bash
mvn test
```