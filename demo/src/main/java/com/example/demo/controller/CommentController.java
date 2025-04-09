package com.example.demo.controller;

import com.example.demo.DTO.ChangeCommentDTO;
import com.example.demo.model.Comment;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/create")
    public Comment createComment(@RequestBody Comment comment) {
//        comment.setDate();
        return commentService.createComment(comment);
    }

    @DeleteMapping("/delete/{commentID}")
    public ResponseEntity<String> deleteComment(@PathVariable String commentID) {
       return commentService.deleteComment(commentID);
    }

    @PostMapping("/change")
    public Comment changeComment(@RequestBody ChangeCommentDTO newComment) {
        return commentService.changeComment(newComment.getCommentID(), newComment.getNewText());
    }

}
