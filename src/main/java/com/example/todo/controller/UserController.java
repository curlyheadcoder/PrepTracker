package com.example.todo.controller;

import com.example.todo.dto.request.UserRequest;
import com.example.todo.dto.response.UserResponse;
import com.example.todo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Create a new User
     *
     * Returns HTTP 201 CREATED because a new resource is created on the server.
     */
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest request) {
        UserResponse response = userService.createUser(request);
        // Returning 201 CREATED (REST best practice for POST resource creation)
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Retrieve User by ID
     *
     * Returns HTTP 200 OK with the User entity representation.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse response = userService.getUserById(id);
        // Returning 200 OK
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieve all Users
     *
     * Returns HTTP 200 OK with a list of all users.
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        // Returning 200 OK
        return ResponseEntity.ok(users);
    }
}
