# Spring Data JPA & Database Persistence Interview Guide

## 1. Concept Overview
Spring Data JPA reduces data access code by automatically generating repository implementations at runtime based on method names or explicit JPQL/Native queries.

## 2. Query Types Compared
| Query Type | Written Against | Example in Project | Pros/Cons |
|---|---|---|---|
| **Derived Query** | Repository Method Name | `findByStatusAndPriority(...)` | Very fast to write; limited for complex queries |
| **JPQL (`@Query`)** | Java Entities (`Todo t`) | `SELECT t FROM Todo t WHERE t.user.id = :userId` | Database agnostic; strong typing |
| **Native Query** | Database Tables (`todos`) | `SELECT * FROM todos WHERE priority = :priority` | MySQL specific features; bypasses JPA object mapping optimization |

## 3. Entity Mappings & Relationships
```java
// User entity (1-to-N)
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
private List<Todo> todos = new ArrayList<>();

// Todo entity (N-to-1)
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;
```

## 4. Transaction Management (`@Transactional`)
- `@Transactional`: Wraps method execution inside a database transaction.
- **ACID properties**: Atomicity, Consistency, Isolation, Durability.
- `readOnly = true`: Optimization hint to Hibernate to skip dirty checking on entities.
- **Rollback behavior**: Unchecked exceptions (`RuntimeException`, `Error`) trigger rollback by default. Checked exceptions do not trigger rollback unless `rollbackFor = Exception.class` is specified.

## 5. Common Interview Questions
1. **Q: What is the N+1 SELECT Problem and how do you solve it?**
   *A:* Happens when querying N entities (e.g. 100 Todos) causes 1 initial query + N additional queries to fetch their associated User entities when using `FetchType.LAZY` or `EAGER` incorrectly. Solution: Use `JOIN FETCH` in JPQL or `@EntityGraph`.
2. **Q: What is the difference between `FetchType.LAZY` and `FetchType.EAGER`?**
   *A:* `EAGER` loads associated child entities immediately during parent entity retrieval. `LAZY` defers loading associated child entities until explicitly accessed inside an active transaction.
3. **Q: What is the difference between `save()` and `saveAndFlush()` in Spring Data JPA?**
   *A:* `save()` updates the in-memory persistence context (flushes only when transaction commits). `saveAndFlush()` flushes changes to the database immediately within the ongoing transaction.
