package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

//interfejs repozytorium użytkowników.
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email); //zwraca usera na podstawie adresu email
    User findByName(String name); //zwraca usera na podstawie nazwy
    Optional<User> findByEmailOrName(String email, String name); //zwraca usera na podstawie adresu email lub nazwy
    void deleteByEmail(String email);  //usuwa usera na podstawie adresu email
}
