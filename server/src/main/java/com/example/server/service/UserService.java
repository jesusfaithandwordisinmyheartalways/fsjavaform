package com.example.server.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.server.database.LoginDatabase;
import com.example.server.database.UserDatabase;
import com.example.server.models.Login;
import com.example.server.models.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserDatabase userDatabase;

    @Autowired
    private LoginDatabase loginDatabase;

    @Value("${secret.key}")
    private String secretKey;

    public Map<String, Object> registerUser(User user) {
        Map<String, Object> response = new HashMap<>();

        if (!user.isValidEmail()) {
            response.put("success", false);
            response.put("message", "Invalid email format.");
            return response;
        }

        if (!user.isValidPassword()) {
            response.put("success", false);
            response.put("message", "Password must be 8–15 characters with at least one capital letter and one special character.");
            return response;
        }

        Optional<User> emailExists = userDatabase.findByEmail(user.getEmail());
        if (emailExists.isPresent()) {
            response.put("success", false);
            response.put("message", "User already exists.");
            return response;
        }

        userDatabase.save(user);
        response.put("success", true);
        response.put("message", "User registered successfully.");
        return response;
    }

    public Map<String, Object> loginUser(User user) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> existing = userDatabase.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if (existing.isEmpty()) {
            response.put("success", false);
            response.put("message", "Incorrect email or password.");
            return response;
        }

        // Use old jjwt 0.9.1 method signature:
        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .setExpiration(new Date(System.currentTimeMillis() + 30L * 24 * 60 * 60 * 1000)) // 30 days
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();

        Login loginAttempt = new Login(user.getEmail(), new Date());
        loginDatabase.save(loginAttempt);

        String cookie = "token=" + token + "; Max-Age=" + (30 * 24 * 60 * 60) + "; Path=/; HttpOnly; SameSite=Lax";

        response.put("success", true);
        response.put("message", "Login successful.");
        response.put("setCookie", cookie);
        return response;
    }
}