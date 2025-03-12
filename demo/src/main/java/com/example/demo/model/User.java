package com.example.demo.model;

import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;

    @Setter
    private String verificationCode;
    @Setter
    private boolean verified;

    public User() {}

    public User(String name, String email, String password, String verificationCode, boolean verified ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.verificationCode = verificationCode;
        this.verified = verified;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public boolean isVerified() {
        return verified;
    }

}
