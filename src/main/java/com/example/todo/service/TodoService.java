package com.example.todo.service;

import com.example.todo.dto.request.CreateTodoRequest;
import com.example.todo.dto.request.UpdateTodoRequest;
import com.example.todo.dto.response.TodoAnalyticsResponse;
import com.example.todo.dto.response.TodoResponse;
import com.example.todo.enums.TodoPriority;
import com.example.todo.enums.TodoStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TodoService {

    TodoResponse createTodo(CreateTodoRequest request);

    TodoResponse getTodoById(Long id);

    List<TodoResponse> getAllTodos();

    Page<TodoResponse> getTodosPaged(TodoStatus status, TodoPriority priority, Long userId, Pageable pageable);

    TodoResponse updateTodo(Long id, UpdateTodoRequest request);

    TodoResponse markAsCompleted(Long id);

    void deleteTodo(Long id);

    // Java 8 Stream API Analytics
    TodoAnalyticsResponse getTodoAnalytics();
}
