# Identity Management Microservice (asm-msa-identity)

## Description
This microservice manages identity-related operations following Clean Architecture principles.

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
📁 asm-msa-identity/
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/com/company/asm/identity/
│   │   │   ├── 📁 configuration/  # Spring Boot configurations
│   │   │   ├── 📁 controller/     # REST controllers
│   │   │   ├── 📁 domain/        # Domain entities
│   │   │   ├── 📁 exception/     # Custom exceptions
│   │   │   ├── 📁 repository/    # Data access layer
│   │   │   ├── 📁 service/       # Business logic
│   │   │   └── TransactioApplication.java
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
2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Configure your environment variables in `.env`:
   ```properties
   # Server Configuration
   SERVER_PORT=8084

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=BDD_BANCO_EC
   DB_USERNAME=root
   DB_PASSWORD=your_password

   # Additional Configuration
   SPRING_JPA_SHOW_SQL=false
   ```
4. Run `mvn clean install`

### Environment Configuration
The application uses a hierarchical configuration system:
1. `.env` file (optional) - for local development
2. Environment variables - for production/deployment
3. `application.properties` - default values

Required properties (with defaults):
- `server.port` (default: 8084)
- `spring.datasource.url` (default: jdbc:mariadb://localhost:3306/BDD_BANCO_EC)
- `spring.datasource.username` (default: root)

### Running the Application
```bash
mvn spring-boot:run
```

### API Documentation
Once running, access the Swagger UI at:
- http://localhost:8084/api/swagger-ui.html
- OpenAPI JSON: http://localhost:8084/api/api-docs

## Testing
Run tests with:
```bash
mvn test
```