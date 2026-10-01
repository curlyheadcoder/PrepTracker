# Global Exception Handling Interview Guide

## 1. Concept Overview
Centralized exception handling intercepts exceptions thrown by any controller or service across the application and converts them into standardized, user-friendly JSON error responses.

### Key Annotations
- `@ControllerAdvice`: Intercepts exceptions thrown across controllers.
- `@RestControllerAdvice`: `@ControllerAdvice` + `@ResponseBody` (returns JSON directly).
- `@ExceptionHandler(ExceptionClass.class)`: Marks a method to handle a specific exception type.

## 2. Standardized ErrorResponse Structure
```json
{
  "timestamp": "2026-10-01T19:40:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Input payload contains invalid values",
  "errors": {
    "title": "Title is mandatory",
    "userId": "User ID is mandatory"
  }
}
```

## 3. Where it is implemented in this project
- **`GlobalExceptionHandler.java`**: Annotated with `@RestControllerAdvice`.
- Custom exceptions: `TodoNotFoundException`, `UserNotFoundException`, `DuplicateResourceException`.
- Framework exceptions handled: `MethodArgumentNotValidException` (thrown when `@Valid` fails), `IllegalArgumentException`, `Exception`.

## 4. Common Interview Questions
1. **Q: What is the difference between `@ControllerAdvice` and `@RestControllerAdvice`?**
   *A:* `@RestControllerAdvice` includes `@ResponseBody`, meaning handler methods return object data serialized to JSON automatically instead of resolving HTML view names.
2. **Q: How do you catch Bean Validation errors in `@RestControllerAdvice`?**
   *A:* Handle `MethodArgumentNotValidException`, call `ex.getBindingResult().getFieldErrors()`, extract field names and default messages, and build a response object.
