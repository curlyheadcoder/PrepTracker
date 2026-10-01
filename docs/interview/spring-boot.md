# Spring Boot & Layered Architecture Interview Guide

## 1. Concept Overview
Spring Boot provides opinionated starter templates, auto-configuration (`@EnableAutoConfiguration`), and embedded application servers (Tomcat/Jetty) to rapidly build production-ready applications.

### Layered Architecture
```
[Client / Postman / Frontend]
        ↓ HTTP Request
┌──────────────────────────────────────┐
│ Controller Layer (@RestController)   │ -> Handles HTTP requests, validation, returns ResponseEntity
└──────────────────────────────────────┘
        ↓ DTO
┌──────────────────────────────────────┐
│ Service Layer (@Service)            │ -> Business logic, transactional boundaries (@Transactional)
└──────────────────────────────────────┘
        ↓ Entity
┌──────────────────────────────────────┐
│ Repository Layer (@Repository)       │ -> DB access abstraction (Spring Data JPA JpaRepository)
└──────────────────────────────────────┘
        ↓ SQL
[Database / MySQL / H2]
```

## 2. Why Layered Architecture is Used
- **Separation of Concerns**: Controllers only handle HTTP concerns, Services handle business rules, Repositories handle persistence.
- **Maintainability & Testability**: Mocking dependencies in unit tests is clean and straightforward.
- **Security**: Prevents exposing internal database tables and entities directly to clients.

## 3. Where it is used in this project
- **`com.example.todo.controller`**: `UserController`, `TodoController`
- **`com.example.todo.service.impl`**: `UserServiceImpl`, `TodoServiceImpl`
- **`com.example.todo.repository`**: `UserRepository`, `TodoRepository`

## 4. Key Annotations Explained
- `@SpringBootApplication`: Combination of `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`.
- `@RestController`: Combination of `@Controller` and `@ResponseBody` (automatically serializes return objects to JSON).
- `@Service`: Indicates business logic bean in Spring container.
- `@Repository`: Indicates persistence bean, translates database exceptions into Spring's `DataAccessException` hierarchy.

## 5. Common Interview Questions
1. **Q: What is Spring Boot Auto-Configuration?**
   *A:* Spring Boot automatically configures beans based on classpath dependencies. For example, having `h2` or `mysql-connector-j` on classpath automatically configures a `DataSource` bean unless overridden.
2. **Q: Why use Constructor Injection over `@Autowired` field injection?**
   *A:*
     1. Allows dependencies to be immutable (`final`).
     2. Ensures class cannot be instantiated without required dependencies.
     3. Eases unit testing without starting Spring Context or using reflection.
