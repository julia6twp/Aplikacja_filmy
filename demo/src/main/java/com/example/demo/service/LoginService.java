package com.example.demo.service;

import com.example.demo.DTO.LoginResponseDTO;
import com.example.demo.exceptions.*;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.RedisTemplate;
import java.util.concurrent.TimeUnit;
import java.util.Optional;



@Service
public class LoginService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, User> redisTemplate;

    public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder, RedisTemplate<String, User> redisTemplate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.redisTemplate = redisTemplate;
    }

    public User register(User user) {
        User mailexp = userRepository.findByEmail(user.getEmail());
        User loginexp = userRepository.findByName(user.getName());

        if (mailexp != null) { throw new UnavailableNameException("Użytkownik o mailu - "+ mailexp.getEmail()+" - już istnieje"); }
        if (loginexp != null) { throw new UnavailableNameException("Użytkownik o nazwie - " + loginexp.getName()+" - już istnieje"); }

        if (user.getPassword().length() < 6) { throw new TooShortPasswordException("Podane hasło jest za krótkie"); }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public LoginResponseDTO login(String username, String password) {
        String cacheKey = "user:" + username;
        User user = redisTemplate.opsForValue().get(cacheKey);

        if (user == null) {
            Optional<User> userCheck = userRepository.findByEmailOrName(username, username);
            if (userCheck.isEmpty()) {
                throw new IncorrectLoginException("Błędna nazwa lub email");
            }
            user = userCheck.get();

            redisTemplate.opsForValue().set("user:" + user.getName(), user, 15, TimeUnit.MINUTES);
            redisTemplate.opsForValue().set("user:" + user.getEmail(), user, 15, TimeUnit.MINUTES);

            System.out.println("[CACHE MISS] - załadowano z MongoDB i zapisano w Redis");
        } else {
            System.out.println("[CACHE HIT] - użytkownik z Redis");
        }

        if (!user.isVerified()) {
            throw new UnverifiedUserException("Niezweryfikowany użytkownik");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IncorrectPasswordException("Błędne hasło");
        }

        return new LoginResponseDTO(user.getName(), user.getEmail(), user.getPassword());
    }

    public User changePassword(String username, String oldPassword, String newPassword) {
        Optional<User> userCheck = userRepository.findByEmailOrName(username, username);
        if (userCheck.isEmpty()) {
            throw new UserNotFoundException("Nie znaleziono użytkownika");
        }
        User user = userCheck.get();

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IncorrectPasswordException("Błędne hasło");
        }

        if (newPassword.length() < 6) {
            throw new TooShortPasswordException("Podane hasło jest za krótkie");
        }

        if (newPassword.equals(oldPassword)) {
            throw new InvalidNewPasswordException("Nowe hasło nie może być takie samo jak stare");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        User updatedUser = userRepository.save(user);

        // usuń obie formy z cache
        redisTemplate.delete("user:" + user.getName());
        redisTemplate.delete("user:" + user.getEmail());

        return updatedUser;
    }

    public User changeUsername(String oldUsername, String newUsername) {
        Optional<User> userCheck = userRepository.findByEmailOrName(oldUsername, oldUsername);
        if (userCheck.isEmpty()) {
            throw new UserNotFoundException("Nie znaleziono użytkownika");
        }
        User user = userCheck.get();

        User loginExp = userRepository.findByName(newUsername);
        if (loginExp != null) {
            throw new UnavailableNameException("Wybrana nazwa jest zajęta");
        }

        user.setName(newUsername);
        User updatedUser = userRepository.save(user);

        redisTemplate.delete("user:" + user.getName());
        redisTemplate.delete("user:" + user.getEmail());

        return updatedUser;
    }

    public User resetPassword(String mail, String newPassword) {
        User user = userRepository.findByEmail(mail);
        if (user == null) {
            throw new UserNotFoundException("Nie znaleziono użytkownika");
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new InvalidNewPasswordException("Nowe hasło nie może być takie samo jak stare");
        }

        if (newPassword.length() < 6) {
            throw new TooShortPasswordException("Podane hasło jest za krótkie");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        User updatedUser = userRepository.save(user);

        redisTemplate.delete("user:" + user.getName());
        redisTemplate.delete("user:" + user.getEmail());

        return updatedUser;
    }

}
