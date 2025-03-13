package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;



@Document(collection = "users")
public class User {

    @Getter
    @Id
    private String id;
    @Getter
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

    public User() {}

    public User(String name, String email, String password, String verificationCode, boolean verified, LocalDateTime codeExpiration ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.verificationCode = verificationCode;
        this.verified = verified;
        this.codeExpiration = codeExpiration;
    }

}
