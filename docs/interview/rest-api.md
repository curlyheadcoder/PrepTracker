# REST API & Design Principles Interview Guide

## 1. Concept Overview
REST (Representational State Transfer) is an architectural style for network-based applications utilizing stateless communication over HTTP.

### Primary HTTP Verbs
- **`GET`**: Retrieve resources (Safe & Idempotent).
- **`POST`**: Create a new resource (Neither Safe nor Idempotent).
- **`PUT`**: Replace an existing resource or create if missing (Idempotent).
- **`PATCH`**: Partially modify an existing resource (Not necessarily Idempotent).
- **`DELETE`**: Remove a resource (Idempotent).

## 2. API Design in Todo Project
```http
POST   /api/v1/todos           -> Create Todo (201 CREATED)
GET    /api/v1/todos           -> Get all / paged todos (200 OK)
GET    /api/v1/todos/{id}      -> Get Todo by ID (200 OK)
PUT    /api/v1/todos/{id}      -> Update entire Todo (200 OK)
PATCH  /api/v1/todos/{id}/complete -> Mark as completed (200 OK)
DELETE /api/v1/todos/{id}      -> Delete Todo (204 NO CONTENT)
```

## 3. Pagination & Filtering Design
```http
GET /api/v1/todos?status=PENDING&page=0&size=10&sortBy=createdAt&sortDir=DESC
```
In Spring Data, `Pageable` is passed to `JpaRepository` methods returning `Page<T>` containing total pages, total elements, page index, and content array.

## 4. Common Interview Questions
1. **Q: What does Idempotency mean in REST APIs?**
   *A:* An API method is idempotent if executing it multiple times produces the exact same server state as executing it once. (`GET`, `PUT`, `DELETE` are idempotent; `POST` is not).
2. **Q: What is the difference between `PUT` and `PATCH`?**
   *A:* `PUT` updates or replaces the full resource entity (all fields must be provided). `PATCH` updates specific fields partially.
