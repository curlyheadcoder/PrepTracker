package com.example.todo.service;

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
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import com.example.todo.service.impl.TodoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceImplTest {

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TodoServiceImpl todoService;

    private User sampleUser;
    private Todo sampleTodo;

    @BeforeEach
    void setUp() {
        sampleUser = new User(1L, "John Doe", "john@example.com");
        sampleTodo = new Todo("Learn Spring Boot", "Understand layered architecture", TodoStatus.PENDING, TodoPriority.HIGH, LocalDate.now().plusDays(2), sampleUser);
        sampleTodo.setId(100L);
    }

    @Test
    @DisplayName("createTodo - Success")
    void createTodo_Success() {
        CreateTodoRequest request = new CreateTodoRequest("Learn Spring Boot", "Understand layered architecture", TodoStatus.PENDING, TodoPriority.HIGH, LocalDate.now().plusDays(2), 1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(sampleUser));
        when(todoRepository.save(any(Todo.class))).thenReturn(sampleTodo);

        TodoResponse response = todoService.createTodo(request);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("Learn Spring Boot", response.getTitle());
        assertEquals(1L, response.getUserId());
        verify(todoRepository, times(1)).save(any(Todo.class));
    }

    @Test
    @DisplayName("createTodo - Throws UserNotFoundException when user does not exist")
    void createTodo_UserNotFound() {
        CreateTodoRequest request = new CreateTodoRequest("Learn Spring Boot", "Description", TodoStatus.PENDING, TodoPriority.HIGH, LocalDate.now().plusDays(2), 99L);

        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> todoService.createTodo(request));
        verify(todoRepository, never()).save(any(Todo.class));
    }

    @Test
    @DisplayName("getTodoById - Success")
    void getTodoById_Success() {
        when(todoRepository.findById(100L)).thenReturn(Optional.of(sampleTodo));

        TodoResponse response = todoService.getTodoById(100L);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("Learn Spring Boot", response.getTitle());
    }

    @Test
    @DisplayName("getTodoById - Throws TodoNotFoundException")
    void getTodoById_NotFound() {
        when(todoRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(TodoNotFoundException.class, () -> todoService.getTodoById(999L));
    }

    @Test
    @DisplayName("markAsCompleted - Updates status to COMPLETED")
    void markAsCompleted_Success() {
        when(todoRepository.findById(100L)).thenReturn(Optional.of(sampleTodo));
        when(todoRepository.save(any(Todo.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TodoResponse response = todoService.markAsCompleted(100L);

        assertEquals(TodoStatus.COMPLETED, response.getStatus());
        verify(todoRepository, times(1)).save(sampleTodo);
    }

    @Test
    @DisplayName("deleteTodo - Success")
    void deleteTodo_Success() {
        when(todoRepository.existsById(100L)).thenReturn(true);

        todoService.deleteTodo(100L);

        verify(todoRepository, times(1)).deleteById(100L);
    }

    @Test
    @DisplayName("getTodoAnalytics - Stream API Operations")
    void getTodoAnalytics_Success() {
        Todo t1 = new Todo("Task 1", "Desc", TodoStatus.COMPLETED, TodoPriority.HIGH, LocalDate.now(), sampleUser);
        Todo t2 = new Todo("Task 2", "Desc", TodoStatus.PENDING, TodoPriority.HIGH, LocalDate.now(), sampleUser);
        Todo t3 = new Todo("Task 3", "Desc", TodoStatus.IN_PROGRESS, TodoPriority.LOW, LocalDate.now(), sampleUser);

        when(todoRepository.findAll()).thenReturn(Arrays.asList(t1, t2, t3));

        TodoAnalyticsResponse analytics = todoService.getTodoAnalytics();

        assertEquals(3, analytics.getTotalTodos());
        assertEquals(1, analytics.getCompletedCount());
        assertEquals(1, analytics.getPendingCount());
        assertEquals(1, analytics.getInProgressCount());
        assertEquals(2, analytics.getCountByPriority().get(TodoPriority.HIGH));
    }
}
