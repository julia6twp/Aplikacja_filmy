package com.example.demo.controller;



import com.example.demo.model.LoginStructure;
import com.example.demo.model.User;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return loginService.register(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginStructure loginStructure) {
        return loginService.login(loginStructure.getLogin(),loginStructure.getPassword());
    }

}
