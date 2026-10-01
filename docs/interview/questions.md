# Master Interview Questions & Detailed Answers

---

## 1. Java 8 & Stream API Questions

1. **Q: Why did Java 8 introduce Lambda Expressions?**
   *A:* To introduce functional programming concepts to Java, enable concise syntax for anonymous inner classes, and facilitate parallel stream execution.

2. **Q: What is a Functional Interface? Name 4 built-in functional interfaces.**
   *A:* An interface with exactly one abstract method. Annotated with `@FunctionalInterface`.
   - `Function<T, R>`: takes T, returns R
   - `Predicate<T>`: takes T, returns boolean
   - `Consumer<T>`: takes T, returns void
   - `Supplier<T>`: takes nothing, returns T

3. **Q: What is the difference between `map()` and `flatMap()` in Streams?**
   *A:* `map()` transforms each stream element into another element (1-to-1). `flatMap()` transforms each element into a stream and flattens multiple streams into a single stream (1-to-many).

4. **Q: What is the difference between `filter()` and `map()`?**
   *A:* `filter()` evaluates a boolean condition and retains/discards elements. `map()` transforms elements from type T to type R without reducing the element count.

5. **Q: What is the purpose of `Collectors.groupingBy()`?**
   *A:* It groups stream elements by a classifier function into a `Map<K, List<V>>`.

6. **Q: How does `Optional.ofNullable()` differ from `Optional.of()`?**
   *A:* `Optional.of()` throws a `NullPointerException` immediately if the passed argument is null. `Optional.ofNullable()` creates an empty `Optional` if the passed argument is null.

7. **Q: What are Method References?**
   *A:* Shorthand syntax (`::`) for lambda expressions that call an existing method by name.

8. **Q: What is the difference between `findFirst()` and `findAny()`?**
   *A:* `findFirst()` returns the very first element in encounter order. `findAny()` returns any arbitrary element, which is useful in parallel streams for performance optimization.

9. **Q: Are Streams reusable?**
   *A:* No. Once a terminal operation is called on a Stream, the stream is consumed and closed. Reusing it throws `IllegalStateException`.

10. **Q: How does stream evaluation work under the hood?**
    *A:* Intermediate operations are lazy and build a pipeline execution chain. No elements flow through the pipeline until a terminal operation is executed.

---

## 2. Spring Boot & REST API Questions

11. **Q: Why did you use DTOs instead of returning JPA entities from REST controllers?**
    *A:*
    1. Prevents exposing internal database table structures.
    2. Prevents over-posting/under-posting security vulnerabilities.
    3. Solves Jackson circular JSON serialization errors in `@OneToMany` / `@ManyToOne` entities.

12. **Q: Why use `ResponseEntity` instead of returning objects directly?**
    *A:* `ResponseEntity` allows full control over HTTP response status codes (e.g. 201 CREATED, 204 NO CONTENT, 404 NOT FOUND), HTTP headers, and response body.

13. **Q: What happens when a Todo ID does not exist?**
    *A:* Service throws `TodoNotFoundException`. `GlobalExceptionHandler` annotated with `@RestControllerAdvice` catches it and returns a 404 NOT FOUND HTTP response with a clean JSON body.

14. **Q: Why use `@RestControllerAdvice`?**
    *A:* Centralizes exception handling across all controllers in a single class, avoiding duplicated try-catch blocks in controller methods.

15. **Q: What is the difference between `@Valid` and `@Validated`?**
    *A:* `@Valid` is standard Jakarta Bean Validation for request bodies and cascaded fields. `@Validated` is Spring-specific, supports validation groups, and works on method parameter validations in service/controller classes.

16. **Q: What is the difference between `@Controller` and `@RestController`?**
    *A:* `@RestController` combines `@Controller` and `@ResponseBody`. Method return values are automatically serialized into JSON/XML instead of resolving HTML views.

17. **Q: What is the difference between `PUT` and `PATCH` HTTP methods?**
    *A:* `PUT` updates the entire resource (requires all fields). `PATCH` performs partial updates on specific fields.

18. **Q: What HTTP status code should a successful DELETE endpoint return?**
    *A:* `204 NO CONTENT` if no response body is returned, or `200 OK` if returning a deletion confirmation payload.

19. **Q: What is Constructor Injection and why is it preferred over `@Autowired` on fields?**
    *A:* Constructor injection passes dependencies through class constructors. It enables immutable `final` fields, prevents incomplete object construction, and simplifies unit testing without reflection.

20. **Q: What is the role of `application.yml` in Spring Boot?**
    *A:* Defines application configuration properties (database URLs, server ports, logging levels, custom properties) structured cleanly in YAML syntax.

---

## 3. Spring Data JPA & SQL Questions

21. **Q: What is Spring Data JPA `JpaRepository`?**
    *A:* An interface providing built-in CRUD operations, pagination, and sorting out of the box without requiring manual DAO implementation code.

22. **Q: What is the N+1 SELECT problem in JPA?**
    *A:* Occurs when retrieving N parent entities triggers 1 initial SELECT query for parents plus N additional SELECT queries to fetch LAZY child entities. Solved using `JOIN FETCH` or `@EntityGraph`.

23. **Q: What is the difference between JPQL and Native SQL?**
    *A:* JPQL queries Java Entities (`SELECT t FROM Todo t`), making queries database-agnostic. Native SQL queries actual database tables (`SELECT * FROM todos`), binding to a specific database dialect.

24. **Q: How does `@Transactional` work in Spring?**
    *A:* Uses Spring AOP proxies to begin a database transaction before method execution and commit upon successful completion. If an unchecked exception (`RuntimeException`) occurs, the transaction rolls back.

25. **Q: What is the difference between `INNER JOIN` and `LEFT JOIN`?**
    *A:* `INNER JOIN` returns only rows with matching values in both tables. `LEFT JOIN` returns all rows from the left table and matched rows from the right table (filling NULLs for non-matching right table rows).

26. **Q: What does the `HAVING` clause do in SQL?**
    *A:* Filters aggregated groups created by `GROUP BY`. `WHERE` filters individual rows before aggregation; `HAVING` filters aggregated groups after `GROUP BY`.

---

## 4. JUnit 5 & Mockito Questions

27. **Q: What is the difference between `@Mock` and `@InjectMocks` in Mockito?**
    *A:* `@Mock` creates a dummy mock instance of a dependency. `@InjectMocks` creates an instance of the class under test and injects all created `@Mock` fields into it.

28. **Q: What is `MockMvc` used for?**
    *A:* Used in Spring Boot controller tests to send fake HTTP requests (`get()`, `post()`, `delete()`) and verify HTTP response status codes, headers, and JSON body content without starting a real HTTP server.

29. **Q: What is the difference between Unit Testing and Integration Testing?**
    *A:* Unit tests isolate a single component/class by mocking external dependencies. Integration tests verify how multiple layers (Controller + Service + DB) operate together.

30. **Q: What is the purpose of `assertThrows()` in JUnit 5?**
    *A:* Asserts that a specific code block or lambda invocation throws an expected exception class type.
