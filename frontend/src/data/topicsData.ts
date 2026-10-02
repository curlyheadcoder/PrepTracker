import type { StudyTopic } from '../types';

export const STUDY_TOPICS: StudyTopic[] = [
  // Day 1
  {
    id: 't1', day: 1, title: 'Java 8 Features',
    subtopics: [
      { id: 't1_s1', title: 'Lambda Expressions & Anonymous Functions Syntax' },
      { id: 't1_s2', title: 'Functional Interfaces (Function, Predicate, Consumer, Supplier)' },
      { id: 't1_s3', title: 'Optional Class & Null-Safe Exception Handling' },
      { id: 't1_s4', title: 'Method References (Class::methodName)' }
    ]
  },
  {
    id: 't2', day: 1, title: 'Stream API',
    subtopics: [
      { id: 't2_s1', title: 'filter() & map() Transformation Pipelines' },
      { id: 't2_s2', title: 'flatMap(), sorted(), distinct()' },
      { id: 't2_s3', title: 'collect(Collectors.toList()) & Collectors.toMap()' },
      { id: 't2_s4', title: 'collect(Collectors.groupingBy(..., counting())) Aggregations' },
      { id: 't2_s5', title: 'reduce() & count() Terminal Operations' }
    ]
  },
  {
    id: 't3', day: 1, title: 'Spring Boot REST API & CRUD',
    subtopics: [
      { id: 't3_s1', title: 'Controller Layer (@RestController, @RequestMapping)' },
      { id: 't3_s2', title: 'HTTP Verbs (GET, POST, PUT, PATCH, DELETE)' },
      { id: 't3_s3', title: 'Path Variables (@PathVariable) & Query Params (@RequestParam)' },
      { id: 't3_s4', title: 'Pagination & Sorting (Pageable, PageRequest, Sort)' }
    ]
  },
  {
    id: 't4', day: 1, title: 'ResponseEntity Class & HTTP Status Codes',
    subtopics: [
      { id: 't4_s1', title: '201 CREATED (Resource Creation)' },
      { id: 't4_s2', title: '200 OK (Successful Retrieval & Updates)' },
      { id: 't4_s3', title: '204 NO CONTENT (Successful Deletion)' },
      { id: 't4_s4', title: '400 BAD REQUEST (Bean Validation Failures)' },
      { id: 't4_s5', title: '404 NOT FOUND & 409 CONFLICT' }
    ]
  },
  {
    id: 't5', day: 1, title: 'Global Exception Handling',
    subtopics: [
      { id: 't5_s1', title: '@RestControllerAdvice vs @ControllerAdvice' },
      { id: 't5_s2', title: '@ExceptionHandler for Custom Exceptions (TodoNotFoundException)' },
      { id: 't5_s3', title: 'Handling MethodArgumentNotValidException for @Valid' },
      { id: 't5_s4', title: 'Standardized ErrorResponse JSON Structure' }
    ]
  },
  {
    id: 't6', day: 1, title: 'DTOs & Layer Separation',
    subtopics: [
      { id: 't6_s1', title: 'Request DTOs vs Response DTOs' },
      { id: 't6_s2', title: 'Entity vs DTO Separation Rationale' },
      { id: 't6_s3', title: 'Preventing Over-posting & Circular JSON Loops' }
    ]
  },
  {
    id: 't7', day: 1, title: 'Spring Validation',
    subtopics: [
      { id: 't7_s1', title: '@NotBlank & @NotNull' },
      { id: 't7_s2', title: '@Size & @Email' },
      { id: 't7_s3', title: '@FutureOrPresent Date Rules' },
      { id: 't7_s4', title: 'Controller @Valid Trigger' }
    ]
  },
  {
    id: 't8', day: 1, title: 'Spring Data JPA',
    subtopics: [
      { id: 't8_s1', title: 'JpaRepository Interface' },
      { id: 't8_s2', title: 'Derived Query Methods (findByStatus)' },
      { id: 't8_s3', title: 'JPQL Query (@Query("SELECT t FROM Todo t..."))' },
      { id: 't8_s4', title: 'Native SQL Query (@Query(nativeQuery = true))' },
      { id: 't8_s5', title: 'N+1 Problem & FetchType.LAZY vs EAGER' }
    ]
  },
  {
    id: 't9', day: 1, title: 'MySQL CRUD & JOIN Queries',
    subtopics: [
      { id: 't9_s1', title: 'Basic DDL & DML (INSERT, SELECT, UPDATE, DELETE)' },
      { id: 't9_s2', title: 'INNER JOIN & LEFT JOIN' },
      { id: 't9_s3', title: 'GROUP BY & HAVING Clause Aggregations' },
      { id: 't9_s4', title: 'Subqueries & WHERE IN Clauses' }
    ]
  },

  // Day 2
  {
    id: 't10', day: 2, title: 'Spring Transaction Management',
    subtopics: [
      { id: 't10_s1', title: '@Transactional Annotation & Boundaries' },
      { id: 't10_s2', title: 'ACID Properties in Relational Databases' },
      { id: 't10_s3', title: 'Rollback Rules (Checked vs Unchecked Exceptions)' },
      { id: 't10_s4', title: 'readOnly = true Optimization' }
    ]
  },
  {
    id: 't11', day: 2, title: 'SQL Aggregations & Advanced Queries',
    subtopics: [
      { id: 't11_s1', title: 'COUNT, SUM, AVG, MIN, MAX Functions' },
      { id: 't11_s2', title: 'HAVING Clause Filtering on Aggregates' },
      { id: 't11_s3', title: 'Identifying Users with 0 Todos (LEFT JOIN IS NULL)' }
    ]
  },
  {
    id: 't12', day: 2, title: 'JUnit 5 & Mockito Testing',
    subtopics: [
      { id: 't12_s1', title: '@ExtendWith(MockitoExtension.class)' },
      { id: 't12_s2', title: '@Mock vs @InjectMocks' },
      { id: 't12_s3', title: 'when().thenReturn() & verify()' },
      { id: 't12_s4', title: 'assertThrows() for Exception Testing' }
    ]
  },
  {
    id: 't13', day: 2, title: 'MockMvc Controller Integration Testing',
    subtopics: [
      { id: 't13_s1', title: '@WebMvcTest(Controller.class)' },
      { id: 't13_s2', title: 'MockMvc perform(), post(), get(), delete()' },
      { id: 't13_s3', title: 'Asserting Status Codes (status().isCreated(), status().isNotFound())' },
      { id: 't13_s4', title: 'JSON Path Assertions (jsonPath("$.title"))' }
    ]
  },

  // Day 3
  {
    id: 't14', day: 3, title: 'Microservices Architecture',
    subtopics: [
      { id: 't14_s1', title: 'Monolith to Microservices Evolution' },
      { id: 't14_s2', title: 'API Gateway & Routing' },
      { id: 't14_s3', title: 'Service Discovery (Eureka / Consul)' },
      { id: 't14_s4', title: 'Database per Service & Config Server' }
    ]
  },
  {
    id: 't15', day: 3, title: 'Synchronous vs Asynchronous Communication',
    subtopics: [
      { id: 't15_s1', title: 'REST Synchronous HTTP Communication' },
      { id: 't15_s2', title: 'Tightly Coupled vs Loosely Coupled Systems' },
      { id: 't15_s3', title: 'Timeouts, Retries, and Circuit Breakers' }
    ]
  },
  {
    id: 't16', day: 3, title: 'Apache Kafka Event Messaging',
    subtopics: [
      { id: 't16_s1', title: 'Kafka Producer & Consumer Concepts' },
      { id: 't16_s2', title: 'Topics, Partitions, and Offsets' },
      { id: 't16_s3', title: 'Consumer Groups & Eventual Consistency' }
    ]
  },

  // Day 4
  {
    id: 't17', day: 4, title: 'Docker & Containerization',
    subtopics: [
      { id: 't17_s1', title: 'Multi-stage Dockerfile Design' },
      { id: 't17_s2', title: 'docker-compose.yml for Multi-Container Setup' },
      { id: 't17_s3', title: 'Images, Containers, Volumes, and Port Mapping' }
    ]
  },
  {
    id: 't18', day: 4, title: 'Kubernetes & CI/CD Deployment',
    subtopics: [
      { id: 't18_s1', title: 'Deployments, Pods, and Services' },
      { id: 't18_s2', title: 'ConfigMaps & Secrets' },
      { id: 't18_s3', title: 'Git/GitHub Actions CI/CD Pipeline' },
      { id: 't18_s4', title: 'JIRA & Confluence Agile Workflow' }
    ]
  }
];
