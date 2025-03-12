package com.example.demo.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailStructure {
    private String subject;
    private String message;

    MailStructure(String subject, String message) {
        this.subject = "Kod weryfikacyjny do Aplikacji";
        this.message = "Twój kod weryfikacyjny do Aplikacji: ";
    }
}
