package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResetPasswordStructure {
    String mail;
    String newPassword;
    public ResetPasswordStructure(String mail, String newPassword) {
        this.mail = mail;
        this.newPassword = newPassword;
    }

}
