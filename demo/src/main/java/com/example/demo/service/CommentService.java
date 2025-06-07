package com.example.demo.service;

import com.example.demo.exceptions.CommentNotFoundException;
import com.example.demo.model.Comment;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository= commentRepository;
    }


    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

//dodawanie komentarza
    public ResponseEntity<String> deleteComment(String commentID) {
        Optional<Comment> commentOptional = commentRepository.findById(commentID);

        if(commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            commentRepository.delete(comment);
            return ResponseEntity.ok("Komentarz został usunięty");
        }
        else {
            throw new CommentNotFoundException("Komentarz nie istnieje");
        }

    }

    //zmiana komentarza
    public Comment changeComment(String commentID, String newText) {
        Optional<Comment> commentOptional = commentRepository.findById(commentID);

        if(commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            comment.setText(newText);
            return commentRepository.save(comment);
        }
        else {
            throw new CommentNotFoundException("Komentarz nie istnieje");
        }
    }

    //pobieranie komentarzy do filmu
    public List<Comment> getCommentsByFilmID(int filmID) {
        return commentRepository.findByFilmID(filmID);
    }

    //pobieranie komentarzy po nazwie użytkownika
    public List<Comment> getCommentsByUserName(String userName) {
        return commentRepository.findByUserName(userName);

    }


}
