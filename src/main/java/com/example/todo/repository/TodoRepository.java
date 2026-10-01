package com.example.todo.repository;

import com.example.todo.entity.Todo;
import com.example.todo.enums.TodoPriority;
import com.example.todo.enums.TodoStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // Derived Query Methods
    List<Todo> findByStatus(TodoStatus status);

    List<Todo> findByPriority(TodoPriority priority);

    List<Todo> findByUserId(Long userId);

    List<Todo> findByStatusAndPriority(TodoStatus status, TodoPriority priority);

    Page<Todo> findByStatus(TodoStatus status, Pageable pageable);

    Page<Todo> findByPriority(TodoPriority priority, Pageable pageable);

    Page<Todo> findByUserId(Long userId, Pageable pageable);

    // JPQL Query Example: Query written against Java Entities (Todo t JOIN t.user u)
    @Query("SELECT t FROM Todo t WHERE t.user.id = :userId AND t.status = :status")
    List<Todo> findUserTodosByStatus(@Param("userId") Long userId, @Param("status") TodoStatus status);

    // Native SQL Query Example: Query written directly in SQL dialect against database tables
    @Query(value = "SELECT * FROM todos WHERE priority = :priority AND due_date < CURRENT_DATE", nativeQuery = true)
    List<Todo> findOverdueTodosByPriority(@Param("priority") String priority);

    // JPQL Aggregation Example: Count todos per status
    @Query("SELECT t.status, COUNT(t) FROM Todo t GROUP BY t.status")
    List<Object[]> countTodosByStatusGrouped();
}
