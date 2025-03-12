package com.example.demo.service;

import com.example.demo.model.MailStructure;
import com.example.demo.model.User;
import com.example.demo.model.VerificationCodeGenerator;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("$(spring.mail.username)")
    private String fromMail;

    public MailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void sendMail(String to, MailStructure mailStructure) {
        User user = userRepository.findByEmail(to);
        if (user == null) {throw new RuntimeException("User not found");}

        String code = VerificationCodeGenerator.generate();
        user.setVerificationCode(code);
        userRepository.save(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(mailStructure.getSubject());
        message.setText(mailStructure.getMessage()+code);
        mailSender.send(message);
    }

}
