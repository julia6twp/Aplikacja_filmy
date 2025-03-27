package com.example.demo.controller;


import com.example.demo.DTO.MailRequest;
import com.example.demo.DTO.MailStructure;
import com.example.demo.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private MailService mailService;

    @PostMapping("/send/{mail}")
    public String sendMail(@PathVariable String mail, MailStructure mailStructure) {
    mailService.sendMail(mail, mailStructure);
    return "Dziala";
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestBody MailRequest mailRequest) {
    return mailService.verifyCode(mailRequest.getMail(),mailRequest.getCode());
    }

    @PostMapping("/verify/reset")
    public ResponseEntity<String> verifyCodeForResetPassword(@RequestBody MailRequest mailRequest) {
       return mailService.verifyCodeForChangePassword(mailRequest.getMail(), mailRequest.getCode());
    }

}
