package com.example.todo.mapper;

import com.example.todo.dto.request.CreateTodoRequest;
import com.example.todo.dto.request.UserRequest;
import com.example.todo.dto.response.TodoResponse;
import com.example.todo.dto.response.UserResponse;
import com.example.todo.entity.Todo;
import com.example.todo.entity.User;
import com.example.todo.enums.TodoPriority;
import com.example.todo.enums.TodoStatus;

import java.util.Optional;

public class TodoMapper {

    // Demonstrating Java 8 Optional and Method References
    public static UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        int count = Optional.ofNullable(user.getTodos())
                .map(list -> list.size())
                .orElse(0);

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCreatedAt(),
                count
        );
    }

    public static User toUserEntity(UserRequest request) {
        if (request == null) {
            return null;
        }
        return new User(request.getName(), request.getEmail());
    }

    public static TodoResponse toTodoResponse(Todo todo) {
        if (todo == null) {
            return null;
        }

        Long userId = Optional.ofNullable(todo.getUser())
                .map(User::getId) // Method Reference
                .orElse(null);

        String userName = Optional.ofNullable(todo.getUser())
                .map(User::getName) // Method Reference
                .orElse("Unassigned");

        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.getStatus(),
                todo.getPriority(),
                todo.getDueDate(),
                todo.getCreatedAt(),
                todo.getUpdatedAt(),
                userId,
                userName
        );
    }

    public static Todo toTodoEntity(CreateTodoRequest request, User user) {
        TodoStatus status = Optional.ofNullable(request.getStatus()).orElse(TodoStatus.PENDING);
        TodoPriority priority = Optional.ofNullable(request.getPriority()).orElse(TodoPriority.MEDIUM);

        return new Todo(
                request.getTitle(),
                request.getDescription(),
                status,
                priority,
                request.getDueDate(),
                user
        );
    }
}
