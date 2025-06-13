





package com.example.server.database;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.server.models.Login;

public interface LoginDatabase extends MongoRepository<Login, String> {
}
