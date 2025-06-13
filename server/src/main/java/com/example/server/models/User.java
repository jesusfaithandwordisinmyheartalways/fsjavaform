





package com.example.server.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "register")
public class User {

    @Id
    private String id;

    private String email;
    private String password;

    public User() {}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public boolean isValidEmail() {
        return email != null && email.matches("^[^\\s@]+@[^\\s@]+\\.(com|net|org|edu|gov|io|co)$");
    }

    public boolean isValidPassword() {
        return password != null && password.matches("^(?=.*[A-Z])(?=.*[\\W_])[A-Za-z\\d\\W_]{8,15}$");
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}



