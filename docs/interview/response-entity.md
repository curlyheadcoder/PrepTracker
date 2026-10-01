# ResponseEntity Class Interview Guide

## 1. Concept Overview
`ResponseEntity<T>` represents an entire HTTP response, including:
- **HTTP Status Code** (e.g. 200 OK, 201 CREATED, 204 NO CONTENT, 400 BAD REQUEST, 404 NOT FOUND)
- **HTTP Response Headers** (e.g. `Content-Type`, `Location`, custom headers)
- **HTTP Response Body** (The generic type `T` object serialized to JSON)

## 2. Why it is used
Without `ResponseEntity`, returning a POJO from `@RestController` defaults to `200 OK`. `ResponseEntity` gives explicit programmatic control over the HTTP status codes, headers, and body structure.

## 3. Where & How it is used in this Project
```java
// 201 CREATED - POST /api/v1/todos
return new ResponseEntity<>(createdResponse, HttpStatus.CREATED);

// 200 OK - GET /api/v1/todos/{id}
return ResponseEntity.ok(todoResponse);

// 204 NO CONTENT - DELETE /api/v1/todos/{id}
return ResponseEntity.noContent().build();
```

## 4. Status Codes Mapping Summary
| Status Code | Enum Constant | Usage in Todo Project |
|---|---|---|
| `200` | `HttpStatus.OK` | Successful GET, PUT, PATCH requests |
| `201` | `HttpStatus.CREATED` | Successful POST creation requests |
| `204` | `HttpStatus.NO_CONTENT` | Successful DELETE requests |
| `400` | `HttpStatus.BAD_REQUEST` | Bean Validation failures (@Valid) |
| `404` | `HttpStatus.NOT_FOUND` | TodoNotFoundException, UserNotFoundException |
| `409` | `HttpStatus.CONFLICT` | Duplicate email during user registration |
| `500` | `HttpStatus.INTERNAL_SERVER_ERROR` | Unexpected server runtime exceptions |

## 5. Common Interview Questions
1. **Q: Should you return `ResponseEntity` for every controller endpoint?**
   *A:* Not strictly mandatory if returning simple 200 OK payloads without custom headers, but returning `ResponseEntity` is best practice in REST APIs to explicitly specify status codes like 201 CREATED or 204 NO CONTENT.
2. **Q: How do you return custom HTTP headers using `ResponseEntity`?**
   *A:*
   ```java
   HttpHeaders headers = new HttpHeaders();
   headers.add("X-Custom-Header", "Value");
   return new ResponseEntity<>(body, headers, HttpStatus.OK);
   ```
