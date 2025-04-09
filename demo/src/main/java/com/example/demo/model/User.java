package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Document(collection = "users")
public class User {

    @Getter
    @Id
    private String id;

    @Getter
    @Setter
    private String name;

    @Getter
    private String email;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private String verificationCode;

    @Getter
    @Setter
    private boolean verified;

    @Setter
    @Getter
    private LocalDateTime codeExpiration;

    @Getter
    @Setter
    private Set<Integer> favoriteMovies = new HashSet<>();

    public User() {
        this.favoriteMovies = new HashSet<>();
    }

    public User(String name, String email, String password, String verificationCode, boolean verified, LocalDateTime codeExpiration ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.verificationCode = verificationCode;
        this.verified = verified;
        this.codeExpiration = codeExpiration;
        this.favoriteMovies = new HashSet<>();
    }

}
