package com.example.demo.controller;



import com.example.demo.DTO.LoginResponseDTO;
import com.example.demo.model.*;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
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
    public LoginResponseDTO loginUser(@RequestBody LoginStructure loginStructure) {
        return loginService.login(loginStructure.getLogin(),loginStructure.getPassword());
    }

    @PostMapping("/newPassword")
    public User changePassword(@RequestBody NewPasswordStructure newPasswordStructure) {
        return loginService.changePassword(newPasswordStructure.getUsername(),newPasswordStructure.getOldPassword(),newPasswordStructure.getNewPassword());
    }

    @PostMapping("/newUsername")
    public User changeUsername(@RequestBody NewUsernameStructure newUsernameStructure) {
        return loginService.changeUsername(newUsernameStructure.getOldUsername(),newUsernameStructure.getNewUsername());
    }

    @PostMapping("/resetPassword")
    public User resetPassword(@RequestBody ResetPasswordStructure resetPasswordStructure) {
        return loginService.resetPassword(resetPasswordStructure.getMail(),resetPasswordStructure.getNewPassword());
    }
}
