package com.example.todo.service.impl;

import com.example.todo.dto.request.UserRequest;
import com.example.todo.dto.response.UserResponse;
import com.example.todo.entity.User;
import com.example.todo.exception.DuplicateResourceException;
import com.example.todo.exception.UserNotFoundException;
import com.example.todo.mapper.TodoMapper;
import com.example.todo.repository.UserRepository;
import com.example.todo.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // Constructor Injection (Best Practice for Spring DI & Unit Testing)
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User with email '" + request.getEmail() + "' already exists");
        }

        User user = TodoMapper.toUserEntity(request);
        User savedUser = userRepository.save(user);

        return TodoMapper.toUserResponse(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        return TodoMapper.toUserResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        // Java 8 Streams: Map entity list to response DTO list
        return userRepository.findAll().stream()
                .map(TodoMapper::toUserResponse) // Method Reference
                .collect(Collectors.toList());
    }
}
