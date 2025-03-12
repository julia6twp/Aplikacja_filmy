package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailRequest {
private String mail;
private String code;
    MailRequest(String mail, String code) {
        this.mail = mail;
        this.code = code;
    }

}
