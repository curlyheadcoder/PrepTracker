package com.example.todo.controller;

import com.example.todo.dto.request.CreateTodoRequest;
import com.example.todo.dto.response.TodoResponse;
import com.example.todo.enums.TodoPriority;
import com.example.todo.enums.TodoStatus;
import com.example.todo.exception.GlobalExceptionHandler;
import com.example.todo.exception.TodoNotFoundException;
import com.example.todo.service.TodoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
@Import(GlobalExceptionHandler.class)
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TodoService todoService;

    @Test
    @DisplayName("POST /api/v1/todos - Returns 201 CREATED")
    void createTodo_Returns201Created() throws Exception {
        CreateTodoRequest request = new CreateTodoRequest("Study Microservices", "Read guide", TodoStatus.PENDING, TodoPriority.HIGH, LocalDate.now().plusDays(1), 1L);
        TodoResponse response = new TodoResponse(10L, "Study Microservices", "Read guide", TodoStatus.PENDING, TodoPriority.HIGH, LocalDate.now().plusDays(1), LocalDateTime.now(), LocalDateTime.now(), 1L, "John Doe");

        when(todoService.createTodo(any(CreateTodoRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.title").value("Study Microservices"));
    }

    @Test
    @DisplayName("POST /api/v1/todos - Invalid Payload Returns 400 BAD REQUEST")
    void createTodo_InvalidPayload_Returns400BadRequest() throws Exception {
        CreateTodoRequest request = new CreateTodoRequest("", "", null, null, null, null); // Blank title, null priority & userId

        mockMvc.perform(post("/api/v1/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.errors.title").exists());
    }

    @Test
    @DisplayName("GET /api/v1/todos/{id} - Returns 200 OK")
    void getTodoById_Returns200OK() throws Exception {
        TodoResponse response = new TodoResponse(10L, "Study Microservices", "Read guide", TodoStatus.PENDING, TodoPriority.HIGH, LocalDate.now().plusDays(1), LocalDateTime.now(), LocalDateTime.now(), 1L, "John Doe");

        when(todoService.getTodoById(10L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/todos/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.title").value("Study Microservices"));
    }

    @Test
    @DisplayName("GET /api/v1/todos/{id} - Not Found Returns 404 NOT FOUND")
    void getTodoById_NotFound_Returns404NotFound() throws Exception {
        when(todoService.getTodoById(99L)).thenThrow(new TodoNotFoundException("Todo not found with id: 99"));

        mockMvc.perform(get("/api/v1/todos/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Todo not found with id: 99"));
    }

    @Test
    @DisplayName("DELETE /api/v1/todos/{id} - Returns 204 NO CONTENT")
    void deleteTodo_Returns204NoContent() throws Exception {
        doNothing().when(todoService).deleteTodo(10L);

        mockMvc.perform(delete("/api/v1/todos/10"))
                .andExpect(status().isNoContent());
    }
}
