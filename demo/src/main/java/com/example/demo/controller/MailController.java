package com.example.demo.controller;


import com.example.demo.model.MailStructure;
import com.example.demo.model.User;
import com.example.demo.service.MailService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private MailService mailService;

    @Autowired
    private UserService userService;

    @PostMapping("/send/{mail}")
    public String sendMail(@PathVariable String mail, MailStructure mailStructure) {
    mailService.sendMail(mail, mailStructure);
    return "Dziala";
    }

}
