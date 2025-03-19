package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {
    String login;
    String email;
    String password;

    public LoginResponseDTO(String login, String email, String password) {
        this.login = login;
        this.email = email;
        this.password = password;
    }

}
