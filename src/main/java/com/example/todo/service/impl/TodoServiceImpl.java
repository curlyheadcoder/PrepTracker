package com.example.todo.service.impl;

import com.example.todo.dto.request.CreateTodoRequest;
import com.example.todo.dto.request.UpdateTodoRequest;
import com.example.todo.dto.response.TodoAnalyticsResponse;
import com.example.todo.dto.response.TodoResponse;
import com.example.todo.entity.Todo;
import com.example.todo.entity.User;
import com.example.todo.enums.TodoPriority;
import com.example.todo.enums.TodoStatus;
import com.example.todo.exception.TodoNotFoundException;
import com.example.todo.exception.UserNotFoundException;
import com.example.todo.mapper.TodoMapper;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import com.example.todo.service.TodoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    // Constructor Injection
    public TodoServiceImpl(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public TodoResponse createTodo(CreateTodoRequest request) {
        // Fetch user using Java 8 Optional
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + request.getUserId()));

        Todo todo = TodoMapper.toTodoEntity(request, user);
        Todo savedTodo = todoRepository.save(todo);

        return TodoMapper.toTodoResponse(savedTodo);
    }

    @Override
    @Transactional(readOnly = true)
    public TodoResponse getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));

        return TodoMapper.toTodoResponse(todo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TodoResponse> getAllTodos() {
        // Java 8 Streams: Convert Entity list to DTO list using map & collect
        return todoRepository.findAll().stream()
                .map(TodoMapper::toTodoResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TodoResponse> getTodosPaged(TodoStatus status, TodoPriority priority, Long userId, Pageable pageable) {
        Page<Todo> todosPage;

        if (status != null) {
            todosPage = todoRepository.findByStatus(status, pageable);
        } else if (priority != null) {
            todosPage = todoRepository.findByPriority(priority, pageable);
        } else if (userId != null) {
            todosPage = todoRepository.findByUserId(userId, pageable);
        } else {
            todosPage = todoRepository.findAll(pageable);
        }

        return todosPage.map(TodoMapper::toTodoResponse);
    }

    @Override
    @Transactional
    public TodoResponse updateTodo(Long id, UpdateTodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setStatus(request.getStatus());
        todo.setPriority(request.getPriority());
        todo.setDueDate(request.getDueDate());

        Todo updatedTodo = todoRepository.save(todo);
        return TodoMapper.toTodoResponse(updatedTodo);
    }

    @Override
    @Transactional
    public TodoResponse markAsCompleted(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException("Todo not found with id: " + id));

        todo.setStatus(TodoStatus.COMPLETED);
        Todo savedTodo = todoRepository.save(todo);
        return TodoMapper.toTodoResponse(savedTodo);
    }

    @Override
    @Transactional
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new TodoNotFoundException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }

    /**
     * Java 8 Stream API Showcase Method
     * Demonstrates filter, map, collect, groupingBy, counting, sorted, distinct
     */
    @Override
    @Transactional(readOnly = true)
    public TodoAnalyticsResponse getTodoAnalytics() {
        List<Todo> todos = todoRepository.findAll();

        // Total count using Stream count()
        long totalTodos = todos.stream().count();

        // Count completed todos using filter() and count()
        long completedCount = todos.stream()
                .filter(t -> t.getStatus() == TodoStatus.COMPLETED)
                .count();

        // Count pending todos
        long pendingCount = todos.stream()
                .filter(t -> t.getStatus() == TodoStatus.PENDING)
                .count();

        // Count in progress todos
        long inProgressCount = todos.stream()
                .filter(t -> t.getStatus() == TodoStatus.IN_PROGRESS)
                .count();

        // Group by status and count each group using Collectors.groupingBy and Collectors.counting
        Map<TodoStatus, Long> countByStatus = todos.stream()
                .collect(Collectors.groupingBy(Todo::getStatus, Collectors.counting()));

        // Group by priority and count each group
        Map<TodoPriority, Long> countByPriority = todos.stream()
                .collect(Collectors.groupingBy(Todo::getPriority, Collectors.counting()));

        return new TodoAnalyticsResponse(
                totalTodos,
                completedCount,
                pendingCount,
                inProgressCount,
                countByStatus,
                countByPriority
        );
    }
}
