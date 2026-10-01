package com.example.todo.service;

import com.example.todo.dto.request.UserRequest;
import com.example.todo.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    UserResponse getUserById(Long id);

    List<UserResponse> getAllUsers();
}
