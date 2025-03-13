package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginStructure {
    private String login;
    private String password;

    LoginStructure(String login, String password) {
        this.login = login;
        this.password = password;
    }
}
