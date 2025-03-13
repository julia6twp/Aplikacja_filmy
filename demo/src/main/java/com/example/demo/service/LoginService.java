package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {
        User mailexp= userRepository.findByEmail(user.getEmail());
        User loginexp= userRepository.findByName(user.getName());

        if (mailexp != null) { throw new RuntimeException("Użytkownik o mailu - "+ mailexp.getEmail()+" - juz istnieje"); }
        if(loginexp != null) {throw new RuntimeException("Użytwkonik o nazwie - " + loginexp.getName()+" - juz istnieje"); }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public String login(String username, String password) {
        Optional<User> userCheck= userRepository.findByEmailOrName(username, username);
        if(userCheck.isEmpty()) {return "Błędna nazwa lub email";}

        User user = userCheck.get();
        if(!user.isVerified()){return "Niezweryfikowany użytkownik";}

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Błędne hasło";
        }

        return "Zalogowano pomyślnie";
    }

}
