export interface CheatsheetItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  codeSnippet?: string;
  questions?: { q: string; a: string }[];
}

export const CHEATSHEET_TOPICS: CheatsheetItem[] = [
  {
    id: 'java8',
    category: 'Java 8 & Streams',
    title: 'Java 8 Functional Programming & Stream Pipeline',
    summary: 'Java 8 introduced Lambdas, Method References, Functional Interfaces, Optional, and Stream APIs.',
    codeSnippet: `// Optional Pattern with Custom Exception
User user = userRepository.findById(userId)
    .orElseThrow(() -> new UserNotFoundException("User not found: " + userId));

// Stream Aggregation Pipeline
Map<TodoStatus, Long> countByStatus = todos.stream()
    .collect(Collectors.groupingBy(Todo::getStatus, Collectors.counting()));

// Map Entities to DTOs
List<TodoResponse> dtoList = todos.stream()
    .filter(t -> t.getStatus() == TodoStatus.COMPLETED)
    .map(TodoMapper::toTodoResponse)
    .collect(Collectors.toList());`,
    questions: [
      {
        q: 'What is a Functional Interface? Give built-in examples.',
        a: 'An interface with exactly one abstract method. Examples: Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>.'
      },
      {
        q: 'What is the difference between map() and flatMap()?',
        a: 'map() transforms 1 element to 1 element (1-to-1). flatMap() transforms 1 element to a stream of elements and flattens them (1-to-many).'
      },
      {
        q: 'How does Optional prevent NullPointerException?',
        a: 'It acts as a null-safe container forcing explicit handling via orElse(), orElseThrow(), map(), or ifPresent().'
      }
    ]
  },
  {
    id: 'rest',
    category: 'REST API & ResponseEntity',
    title: 'REST API Verbs & HTTP Status Code Mapping',
    summary: 'Standardized HTTP status codes and control over headers and body using ResponseEntity.',
    codeSnippet: `// 201 CREATED for POST resource creation
@PostMapping
public ResponseEntity<TodoResponse> createTodo(@Valid @RequestBody CreateTodoRequest request) {
    TodoResponse response = todoService.createTodo(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
}

// 204 NO CONTENT for DELETE
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
    todoService.deleteTodo(id);
    return ResponseEntity.noContent().build();
}`,
    questions: [
      {
        q: 'What is Idempotency in REST APIs?',
        a: 'An operation is idempotent if executing it multiple times produces the exact same server state as executing it once (GET, PUT, DELETE are idempotent; POST is not).'
      },
      {
        q: 'Why use ResponseEntity instead of returning raw objects?',
        a: 'ResponseEntity grants full programmatic control over HTTP Status Codes (201, 204, 404), Headers, and JSON response bodies.'
      }
    ]
  },
  {
    id: 'jpa',
    category: 'Spring Data JPA & Hibernate',
    title: 'JPA Derived Queries, JPQL & Native SQL',
    summary: 'Spring Data JPA reduces DAO boilerplate and supports derived queries, JPQL, Native SQL, and pagination.',
    codeSnippet: `// Derived Query Method
Page<Todo> findByStatus(TodoStatus status, Pageable pageable);

// JPQL Query (Entity-based)
@Query("SELECT t FROM Todo t WHERE t.user.id = :userId AND t.status = :status")
List<Todo> findUserTodosByStatus(@Param("userId") Long userId, @Param("status") TodoStatus status);

// Native SQL Query (Table-based)
@Query(value = "SELECT * FROM todos WHERE priority = :priority", nativeQuery = true)
List<Todo> findOverdueTodosByPriority(@Param("priority") String priority);`,
    questions: [
      {
        q: 'What is the N+1 SELECT problem in JPA and how to solve it?',
        a: 'Occurs when querying N parent entities triggers 1 initial query + N separate queries to fetch LAZY child entities. Solved using JOIN FETCH or @EntityGraph.'
      },
      {
        q: 'What is the difference between save() and saveAndFlush()?',
        a: 'save() updates in-memory persistence context and flushes at transaction commit. saveAndFlush() flushes immediately to database.'
      }
    ]
  },
  {
    id: 'sql',
    category: 'MySQL & JOINs',
    title: 'SQL JOINs, Aggregations & Subqueries',
    summary: 'Complex relational database queries using INNER JOIN, LEFT JOIN, GROUP BY, HAVING, and Aggregation functions.',
    codeSnippet: `-- INNER JOIN: Get Todos with User Details
SELECT t.id, t.title, u.name, u.email 
FROM todos t 
INNER JOIN users u ON t.user_id = u.id;

-- LEFT JOIN: Find Users with 0 Todos
SELECT u.id, u.name 
FROM users u 
LEFT JOIN todos t ON u.id = t.user_id 
WHERE t.id IS NULL;

-- GROUP BY & HAVING Clause
SELECT user_id, COUNT(*) AS todo_count 
FROM todos 
GROUP BY user_id 
HAVING COUNT(*) > 5;`,
    questions: [
      {
        q: 'What is the difference between WHERE and HAVING in SQL?',
        a: 'WHERE filters individual rows BEFORE aggregation. HAVING filters aggregated groups AFTER GROUP BY.'
      },
      {
        q: 'When would you use a LEFT JOIN instead of an INNER JOIN?',
        a: 'Use LEFT JOIN when you want all records from the left table regardless of whether there is a matching row in the right table (e.g. users with 0 todos).'
      }
    ]
  }
];
