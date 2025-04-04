package com.example.demo.repository;

import com.example.demo.model.Comment;
import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByUserName(String  user);
    List<Comment> findByFilmID(int filmID);
    void deleteByUserName(String userName);
}
