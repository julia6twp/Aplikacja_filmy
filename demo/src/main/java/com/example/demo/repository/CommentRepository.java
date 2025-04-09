package com.example.demo.repository;

import com.example.demo.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByUserName(String  user);
    List<Comment> findByFilmID(int filmID);
    Optional<Comment> findById(String commentID);
    void deleteByUserName(String userName);
}
