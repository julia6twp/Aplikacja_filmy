package com.example.demo.service;

import com.example.demo.exceptions.IncorrectPasswordException;
import com.example.demo.exceptions.InvalidNewPasswordException;
import com.example.demo.exceptions.UnavailableNameException;
import com.example.demo.exceptions.UserNotFoundException;
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

        if (mailexp != null) { throw new UnavailableNameException("Użytkownik o mailu - "+ mailexp.getEmail()+" - juz istnieje"); }
        if(loginexp != null) {throw new UnavailableNameException("Użytwkonik o nazwie - " + loginexp.getName()+" - juz istnieje"); }

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

    public User changePassword(String username, String oldPassword, String newPassword) {
        Optional<User> userCheck= userRepository.findByEmailOrName(username, username);
        if(userCheck.isEmpty()) {throw new UserNotFoundException("Nie znaleziono użytkownika");}
        User user = userCheck.get();

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IncorrectPasswordException("Błędne hasło");
        }

        if(newPassword.equals(oldPassword)) {
            throw new InvalidNewPasswordException("Podane nowe hasło jest takie samo jak poprzednie");
        }
        else {
            user.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.save(user);
        }

    }

    public User changeUsername(String oldUsername, String newUsername) {
        Optional<User> userCheck= userRepository.findByEmailOrName(oldUsername, oldUsername);
        if(userCheck.isEmpty()) {throw new UserNotFoundException("Nie znaleziono użytkownika");}
        User user = userCheck.get();

        User loginExp= userRepository.findByName(newUsername);
        if(loginExp != null) {throw new UnavailableNameException("Wybrana nazwa jest zajęta"); }

        user.setName(newUsername);
        return userRepository.save(user);
    }

    public User resetPassword(String mail, String newPassword) {
        User user= userRepository.findByEmail(mail);

        if(passwordEncoder.matches(newPassword, user.getPassword())) {
            System.out.println("Reset password");
            throw new InvalidNewPasswordException("Podane nowe hasło jest takie samo jak poprzednie");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);

    }

}
