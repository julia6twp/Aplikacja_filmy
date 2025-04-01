package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Document(collection = "comments")
public class Comment {

    @Getter
    @Id
    private String id;
    @Getter
    @Setter
    private int filmID;
    @Getter
    @Setter
    private String text;
    @Getter
    @Setter
    private String userName;
    @Getter
    @Setter
    private LocalDateTime date;


    Comment(String  id,int filmID, String text, String userName, LocalDateTime date) {
        this.id = id;
        this.filmID = filmID;
        this.text = text;
        this.userName = userName;
        this.date = date;
    }
}
