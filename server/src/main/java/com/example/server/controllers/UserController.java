




package com.example.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.server.models.User;
import com.example.server.service.UserService;

import jakarta.annotation.PostConstruct;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user/create")
    public Map<String, Object> createUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/account/login")
    public Map<String, Object> loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    @GetMapping("/")
    public String ping() {
        return "Backend server is on!";
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ UserController initialized");
    }
}


