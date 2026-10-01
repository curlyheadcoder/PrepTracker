package com.example.todo.controller;

import com.example.todo.dto.request.CreateTodoRequest;
import com.example.todo.dto.request.UpdateTodoRequest;
import com.example.todo.dto.response.TodoAnalyticsResponse;
import com.example.todo.dto.response.TodoResponse;
import com.example.todo.enums.TodoPriority;
import com.example.todo.enums.TodoStatus;
import com.example.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    /**
     * Create Todo
     *
     * HTTP Status: 201 CREATED
     * Reason: Indicates resource successfully created.
     */
    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@Valid @RequestBody CreateTodoRequest request) {
        TodoResponse created = todoService.createTodo(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Get Todo by ID
     *
     * HTTP Status: 200 OK
     */
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponse> getTodoById(@PathVariable Long id) {
        TodoResponse response = todoService.getTodoById(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all Todos or Filtered & Paged Todos
     *
     * HTTP Status: 200 OK
     * Query Parameters: status, priority, userId, page, size, sortBy
     */
    @GetMapping
    public ResponseEntity<Page<TodoResponse>> getTodos(
            @RequestParam(required = false) TodoStatus status,
            @RequestParam(required = false) TodoPriority priority,
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<TodoResponse> responsePage = todoService.getTodosPaged(status, priority, userId, pageable);
        return ResponseEntity.ok(responsePage);
    }

    /**
     * Update Todo
     *
     * HTTP Status: 200 OK
     * Reason: Updated resource representation returned.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTodoRequest request
    ) {
        TodoResponse updated = todoService.updateTodo(id, request);
        return ResponseEntity.ok(updated);
    }

    /**
     * Mark Todo as completed (Partial Update)
     *
     * HTTP Status: 200 OK
     */
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TodoResponse> markAsCompleted(@PathVariable Long id) {
        TodoResponse updated = todoService.markAsCompleted(id);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete Todo by ID
     *
     * HTTP Status: 204 NO CONTENT
     * Reason: Resource successfully deleted; no body needs to be returned.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get Stream API Analytics on Todos
     *
     * HTTP Status: 200 OK
     */
    @GetMapping("/analytics")
    public ResponseEntity<TodoAnalyticsResponse> getTodoAnalytics() {
        TodoAnalyticsResponse analytics = todoService.getTodoAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
