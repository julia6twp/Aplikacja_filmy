package com.example.demo.service;

import com.example.demo.DTO.LoginResponseDTO;
import com.example.demo.exceptions.*;
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

        if(user.getPassword().length() < 6) {throw new TooShortPasswordException("Podane hasło jest za krótkie");}

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public LoginResponseDTO login(String username, String password) {
        Optional<User> userCheck= userRepository.findByEmailOrName(username, username);
        if(userCheck.isEmpty()) {throw new IncorrectLoginException( "Błędna nazwa lub email");}

        User user = userCheck.get();
        if(!user.isVerified()){throw new UnverifiedUserException( "Niezweryfikowany użytkownik");}

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IncorrectPasswordException( "Błędne hasło");
        }

        return new LoginResponseDTO (user.getName(), user.getEmail(), user.getPassword());
    }

    public User changePassword(String username, String oldPassword, String newPassword) {
        Optional<User> userCheck= userRepository.findByEmailOrName(username, username);
        if(userCheck.isEmpty()) {throw new UserNotFoundException("Nie znaleziono użytkownika");}
        User user = userCheck.get();

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IncorrectPasswordException("Błędne hasło");
        }

        if(newPassword.length() < 6) {throw new TooShortPasswordException("Podane hasło jest za krótkie");}

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

        if(newPassword.length() < 6) {throw new TooShortPasswordException("Podane hasło jest za krótkie");}

        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);

    }



}
