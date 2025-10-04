# Clean Architecture Spring Boot Project

## Description
This project follows Clean Architecture principles and implements a customer management microservice using Spring Boot.

## Project Structure
```
📁 src/
├── 📁 main/java/com.company.asm.customer/
│   ├── 📁 configuration/    # Spring Boot configurations
│   ├── 📁 controller/       # REST controllers
│   ├── 📁 domain/          # Domain entities and enums
│   ├── 📁 exception/       # Custom exceptions
│   ├── 📁 helper/          # Helper classes
│   ├── 📁 repository/      # Data access layer
│   ├── 📁 service/         # Business logic
│   └── 📁 util/            # Utility classes
└── 📁 test/                # Test classes
```

## Technologies
- Java 21
- Spring Boot 3.2.0
- MariaDB
- Lombok
- SpringDoc OpenAPI (Swagger)
- JUnit 5 & Mockito

## Prerequisites
- JDK 21
- Maven 3.8+
- MariaDB

## Building the Project
```bash
mvn clean install
```

## Running the Application
```bash
mvn spring-boot:run
```

## API Documentation
Once the application is running, you can access the Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

## Testing
```bash
mvn test
```