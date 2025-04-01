package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByName(String name);
    Optional<User> findByEmailOrName(String email, String name);
    void deleteByEmail(String email);
}
