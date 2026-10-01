# Stream API Interview Guide

## 1. Concept Overview
The **Stream API** (`java.util.stream`) is used to process sequences of elements declaratively. A Stream pipeline consists of:
1. **Source**: Collection, Array, or I/O channel.
2. **Intermediate Operations**: Return a new Stream, executed lazily (e.g., `filter`, `map`, `flatMap`, `sorted`, `distinct`).
3. **Terminal Operations**: Produce a non-stream result or side-effect, triggering stream execution (e.g., `collect`, `forEach`, `count`, `reduce`, `findFirst`).

## 2. Why it is used
- Allows parallel data processing with `parallelStream()`.
- Supports lazy evaluation (intermediate operations are evaluated only when a terminal operation is called).
- Enables clean, readable aggregation and transformation pipelines.

## 3. Where it is used in this project
- **`TodoServiceImpl.java` (`getTodoAnalytics()`)**:
  - `filter()`: Filter todos by `status == COMPLETED`, `PENDING`, or `IN_PROGRESS`.
  - `collect(groupingBy(..., counting()))`: Aggregate counts per `status` and `priority`.
  - `map()` & `collect(Collectors.toList())`: Transform entity lists into DTO lists.

## 4. Key Stream Operations & Definitions
| Operation | Type | Purpose | Example |
|---|---|---|---|
| `filter(Predicate)` | Intermediate | Filters elements matching condition | `.filter(t -> t.getStatus() == COMPLETED)` |
| `map(Function)` | Intermediate | Transforms each element into another type | `.map(TodoMapper::toTodoResponse)` |
| `flatMap(Function)` | Intermediate | Flattens nested streams/collections into a single stream | `.flatMap(user -> user.getTodos().stream())` |
| `sorted()` | Intermediate | Sorts elements by natural or custom comparator | `.sorted(Comparator.comparing(Todo::getDueDate))` |
| `distinct()` | Intermediate | Filters unique elements based on `equals()` | `.distinct()` |
| `collect(Collector)` | Terminal | Accumulates stream elements into a Collection or Map | `.collect(Collectors.toList())` |
| `groupingBy()` | Collector | Groups elements by a classifier function | `Collectors.groupingBy(Todo::getStatus, Collectors.counting())` |
| `reduce()` | Terminal | Combines stream elements into a single value using associative accumulation | `.reduce(0, (a, b) -> a + b)` |

## 5. Common Interview Questions
1. **Q: What is the difference between intermediate and terminal operations?**
   *A:* Intermediate operations return a Stream and are lazy (not executed until a terminal operation is invoked). Terminal operations return a result/void and trigger the stream execution pipeline.
2. **Q: What is the difference between `map()` and `flatMap()`?**
   *A:* `map()` transforms a 1-to-1 stream element (`Stream<T> -> Stream<R>`). `flatMap()` transforms 1-to-many stream elements by flattening nested streams (`Stream<List<T>> -> Stream<T>`).
3. **Q: How does `Collectors.groupingBy` work?**
   *A:* It classifies elements of a stream according to a classifier function and returns a `Map<K, List<V>>` (or another collector downstream, such as `Collectors.counting()`).
