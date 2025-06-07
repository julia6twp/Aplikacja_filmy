package com.example.demo.service;

import com.example.demo.exceptions.ExpiredVerificationCodeException;
import com.example.demo.exceptions.IncorrectVerificationCodeException;
import com.example.demo.exceptions.UserIsAlreadyVerifiedException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.DTO.MailStructure;
import com.example.demo.model.User;
import com.example.demo.model.VerificationCodeGenerator;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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

    //wysyłanie maila z kodem weryfikacyjnym
    public void sendMail(String to, MailStructure mailStructure) {
        User user = userRepository.findByEmail(to);
        if (user == null) {throw new UserNotFoundException("Nie znaleziono użytkownika!");}

        String code = VerificationCodeGenerator.generate();
        user.setVerificationCode(code);
        user.setCodeExpiration(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(mailStructure.getSubject());
        message.setText(mailStructure.getMessage()+code);
        mailSender.send(message);
    }

    // weryfikacja konta użytkownika
    public ResponseEntity<String> verifyCode(String to, String code) {
        User user = userRepository.findByEmail(to);
        if (user == null) {throw new UserNotFoundException("Nie znaleziono użytkownika!");}

        if(user.isVerified()) {throw new UserIsAlreadyVerifiedException( "Konto zostało już zweryfikowane");}

        if(user.getCodeExpiration().isBefore(LocalDateTime.now())) {
            throw new IncorrectVerificationCodeException( "Kod weryfikacyjny wygasł, wygeneruj nowy");
        }

        if(code.equals(user.getVerificationCode())) {
            user.setVerified(true);
            user.setVerificationCode(null);
            userRepository.save(user);
            return ResponseEntity.ok("Konto zostało zweryfikowane");
        }
        else {
            throw new IncorrectVerificationCodeException( "Błędny kod weryfikacyjny");
        }

    }

    //weryfikacja maila przy resecie hasła
    public ResponseEntity<String> verifyCodeForChangePassword(String to, String code) {
        User user = userRepository.findByEmail(to);
        
        if (user == null) {throw new UserNotFoundException("Nie znaleziono użytkownika!");}

//        if(!user.isVerified()) {return "Konto nie zostało jeszcze zweryfikowane, nie można zresetować hasła";}
        
        if(user.getCodeExpiration().isBefore(LocalDateTime.now())) {
            throw new ExpiredVerificationCodeException( "Kod weryfikacyjny wygasł, wygeneruj nowy");
        }

        if(!code.equals(user.getVerificationCode())) {
            throw new IncorrectVerificationCodeException("Błędny kod weryfikacyjny");
        }

        return ResponseEntity.ok("Kod jest poprawny");
    }  

}
