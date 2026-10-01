# DTOs & Bean Validation Interview Guide

## 1. Concept Overview
### Data Transfer Objects (DTOs)
DTOs are plain Java objects used to pass data between software layers without exposing internal database entities.

### Bean Validation (Jakarta Validation)
Declarative annotations placed on DTO fields to enforce validation rules before business logic executes. Triggered by `@Valid` in Controller parameters.

## 2. Why DTOs are Used (Entity vs DTO)
1. **Security**: Avoids over-posting/under-posting attacks (e.g., client injecting `id` or system flags).
2. **Encapsulation**: Prevents internal JPA entity schema changes from breaking external API contracts.
3. **Performance**: Avoids infinite circular JSON serialization loops caused by bidirectional `@OneToMany`/`@ManyToOne` relationships.

## 3. Validation Annotations Used in this Project
- `@NotNull`: Value cannot be null.
- `@NotBlank`: String cannot be null, empty, or whitespace.
- `@Size(min=x, max=y)`: String/collection size must be within range.
- `@Email`: Must match valid email regex format.
- `@FutureOrPresent`: Date must be today or in the future.

## 4. Code Example
```java
// Controller
@PostMapping
public ResponseEntity<TodoResponse> createTodo(@Valid @RequestBody CreateTodoRequest request) { ... }

// DTO
public class CreateTodoRequest {
    @NotBlank(message = "Title is mandatory")
    @Size(min = 3, max = 150)
    private String title;

    @NotNull(message = "User ID is mandatory")
    private Long userId;

    @FutureOrPresent(message = "Due date must be today or future")
    private LocalDate dueDate;
}
```

## 5. Common Interview Questions
1. **Q: What is the difference between `@Valid` and `@Validated`?**
   *A:* `@Valid` is standard Jakarta Bean Validation for validating request bodies and cascaded objects. `@Validated` is a Spring annotation used at class level to validate method parameters (e.g. `@PathVariable`, `@RequestParam`) and supports validation groups.
2. **Q: Why should you never return JPA Entities directly from REST Controllers?**
   *A:*
     - Exposes internal DB schema.
     - Can trigger LazyInitializationException during JSON serialization outside transaction.
     - Causes Jackson infinite recursion loops on bidirectional relationships.
