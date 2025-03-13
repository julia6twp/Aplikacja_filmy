package com.example.demo.controller;


import com.example.demo.model.MailRequest;
import com.example.demo.model.MailStructure;
import com.example.demo.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String verifyCode(@RequestBody MailRequest mailRequest) {
    return mailService.verifyCode(mailRequest.getMail(),mailRequest.getCode());
    }

    @PostMapping("/verify/reset")
    public void verifyCodeForResetPassword(@RequestBody MailRequest mailRequest) {
        mailService.verifyCodeForChangePassword(mailRequest.getMail(), mailRequest.getCode());
    }

}
