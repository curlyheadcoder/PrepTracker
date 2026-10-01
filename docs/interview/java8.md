# Java 8 Features Interview Guide

## 1. Concept Overview
Java 8 introduced major functional programming capabilities to the Java language, including:
- **Lambda Expressions**: Anonymous functions allowing concise expression of single-method interfaces.
- **Functional Interfaces**: Interfaces with exactly one abstract method (e.g., `Function`, `Predicate`, `Consumer`, `Supplier`).
- **Method References**: Compact syntax for calling existing methods using `Class::methodName`.
- **Optional Class**: Container object used to prevent `NullPointerException` and avoid explicit null checks.
- **Stream API**: Functional processing pipelines for collections of objects.

## 2. Why it is used
- Reduces boilerplate code.
- Improves code readability and maintainability.
- Enables functional-style operations (immutability, declarative data processing).
- Provides safer null-handling with `Optional`.

## 3. Where it is used in this project
- **`TodoMapper.java`**: Uses `Optional.ofNullable(...)` and method references like `User::getId` and `User::getName`.
- **`TodoServiceImpl.java`**: Uses `Optional.orElseThrow(...)` for throwing custom exceptions when entities are not present in the DB.
- **`GlobalExceptionHandler.java`**: Uses `.forEach(...)` lambdas for iterating over validation field errors.

## 4. Code Examples from this Project
```java
// Method Reference & Optional in TodoMapper.java
String userName = Optional.ofNullable(todo.getUser())
        .map(User::getName) // Method Reference
        .orElse("Unassigned");

// Optional with Custom Exception in TodoServiceImpl.java
User user = userRepository.findById(request.getUserId())
        .orElseThrow(() -> new UserNotFoundException("User not found with id: " + request.getUserId()));
```

## 5. Common Interview Questions
1. **Q: What is a Functional Interface? Give built-in examples.**
   *A:* An interface with exactly one abstract method. Annotated with `@FunctionalInterface`. Examples: `Predicate<T>` (`test`), `Function<T,R>` (`apply`), `Consumer<T>` (`accept`), `Supplier<T>` (`get`).
2. **Q: How does Optional solve NullPointerException?**
   *A:* It wraps values that might be null and forces the developer to handle presence (`isPresent()`, `ifPresent()`, `map()`, `orElse()`, `orElseThrow()`) explicitly.
3. **Q: What are Method References and what are the 4 types?**
   *A:* Method references (`::`) are shorthand for lambdas that call a method directly:
     1. Static method reference: `Math::max`
     2. Instance method of an object: `System.out::println`
     3. Instance method of an arbitrary object: `String::compareToIgnoreCase`
     4. Constructor reference: `ArrayList::new`
