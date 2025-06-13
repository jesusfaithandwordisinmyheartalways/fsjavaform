





package com.example.server.database;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.server.models.User;

import java.util.Optional;

public interface UserDatabase extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
}
