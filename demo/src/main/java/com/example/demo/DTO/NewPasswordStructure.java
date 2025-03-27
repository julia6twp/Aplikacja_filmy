package com.example.demo.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPasswordStructure {
    String username;
    String oldPassword;
    String newPassword;

    NewPasswordStructure(String username, String oldPassword, String newPassword) {
        this.username = username;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
