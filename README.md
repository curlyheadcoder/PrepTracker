# ⚡ Java Developer Interview Todo Tracker & Monolith App

> **A Spring Boot 3.x, Java 17 Todo Management System & Interactive 3-4 Day Study Tracker built specifically for Java Developer Interview Preparation.**

---

## 🚀 Features

- **3-4 Day Interview Study Tracker**: Interactive web dashboard tracking 18 core Java developer interview topics.
- **RESTful Todo Management**: Full CRUD operations for Users and Todos.
- **Explicit ResponseEntity Control**: Returns accurate HTTP Status Codes (`201 CREATED`, `200 OK`, `204 NO CONTENT`, `400 BAD REQUEST`, `404 NOT FOUND`, `409 CONFLICT`).
- **Stream API Analytics**: Real-time aggregation metrics powered by Java 8 Streams (`filter`, `map`, `groupingBy`, `counting`).
- **Global Exception Handling**: Centralized `@RestControllerAdvice` returning standardized JSON `ErrorResponse` payloads.
- **Spring Data JPA & Hibernate**: Derived Query Methods, JPQL, and Native SQL queries with MySQL/H2 support.
- **Bean Validation**: Jakarta Validation (`@NotBlank`, `@NotNull`, `@Email`, `@FutureOrPresent`) with `@Valid`.
- **100% Test Coverage for Core Workflows**: Unit & MockMvc tests powered by JUnit 5 and Mockito.

---

## 🛠️ Technology Stack

- **Backend Framework**: Java 17, Spring Boot 3.2.3 (Spring Web, Spring Data JPA, Bean Validation)
- **Database**: H2 (In-memory development default), MySQL Connector
- **Documentation**: OpenAPI 3.0 / Swagger UI
- **Testing**: JUnit 5, Mockito, MockMvc
- **Build Tool**: Apache Maven
- **Containerization & CI/CD**: Docker (Multi-stage build), GitHub Actions

---

## 📊 Architecture & Layered Structure

```
[Web Browser / Swagger / Postman]
               ↓ HTTP Request
┌─────────────────────────────────────────────┐
│  UserController / TodoController           │ -> Handles REST HTTP requests, returns ResponseEntity
└─────────────────────────────────────────────┘
               ↓ DTOs (@Valid)
┌─────────────────────────────────────────────┐
│  UserService / TodoService (@Service)       │ -> Business logic, Stream API, @Transactional
└─────────────────────────────────────────────┘
               ↓ Entities
┌─────────────────────────────────────────────┐
│  UserRepository / TodoRepository            │ -> JpaRepository (Derived, JPQL, Native SQL)
└─────────────────────────────────────────────┘
               ↓ Database SQL
┌─────────────────────────────────────────────┐
│  Database (H2 / MySQL)                      │
└─────────────────────────────────────────────┘
```

---

## 💻 Local Quickstart

### 1. Prerequisites
- Java 17 or higher
- Maven 3.8+

### 2. Run Locally
```bash
# Clone repository
git clone https://github.com/<your-username>/java-interview-todo-tracker.git
cd java-interview-todo-tracker

# Run Maven build and start Spring Boot app
mvn spring-boot:run
```

Access the application in your browser:
- 🌐 **Interactive Web UI**: `http://localhost:8080`
- 📑 **Swagger API Docs**: `http://localhost:8080/swagger-ui.html`
- 🗄️ **H2 DB Console**: `http://localhost:8080/h2-console` *(JDBC URL: `jdbc:h2:mem:tododb`, User: `sa`, Password: blank)*

### 3. Run Unit & Controller Tests
```bash
mvn clean test
```

---

## 🐳 Docker Setup

Build and run using Docker:
```bash
# Build Docker image
docker build -t todo-app:latest .

# Run container on port 8080
docker run -p 8080:8080 todo-app:latest
```

---

## 🌐 Deploy to Cloud for FREE (Render.com)

1. Push this repository to your GitHub account.
2. Sign up at [Render.com](https://render.com/).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Choose **Docker** environment (or Maven environment).
6. Click **Deploy Web Service**! Render will build and host your application live on a public URL (e.g. `https://java-todo-tracker.onrender.com`).

---

## 📚 Interview Study Documentation

- 📄 [Java 8 Features Guide](docs/interview/java8.md)
- 📄 [Stream API Guide](docs/interview/streams.md)
- 📄 [Spring Boot Layered Architecture Guide](docs/interview/spring-boot.md)
- 📄 [REST API & ResponseEntity Guide](docs/interview/response-entity.md)
- 📄 [Global Exception Handling Guide](docs/interview/exception-handling.md)
- 📄 [Spring Data JPA & SQL Queries Guide](docs/sql-interview-queries.sql)
- 📄 [Master Interview Q&A (30+ Questions)](docs/interview/questions.md)
- 📄 [Git & GitHub Commands Cheatsheet](docs/git-cheatsheet.md)
