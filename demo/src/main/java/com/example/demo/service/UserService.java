package com.example.demo.service;

import com.example.demo.exceptions.FavoriteFilmNotFoundException;
import com.example.demo.exceptions.FilmIsAlreadyInFavoritesException;
import com.example.demo.exceptions.IncorrectPasswordException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository=userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public ResponseEntity<String> deleteUser(String emailorUsername, String password) {
        Optional<User> userOptional = userRepository.findByEmailOrName(emailorUsername, emailorUsername);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if(passwordEncoder.matches(password, user.getPassword())) {
                userRepository.deleteByEmail(user.getEmail());
                return ResponseEntity.ok("Usunięto użytkownika");
            }else
            {
            throw new IncorrectPasswordException("Nieprawidłowe hasło");
            }

        }
        else
        {
            throw new UserNotFoundException("Użytkownika nie znaleziono");
        }
    }

    public ResponseEntity<String> addFavorite(String emailorUsername, int filmID) {
        Optional<User> userOptional = userRepository.findByEmailOrName(emailorUsername, emailorUsername);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Set<Integer> set = new HashSet<>(user.getFavoriteMovies());
            if (set.contains(filmID)) {
            throw new FilmIsAlreadyInFavoritesException("Film jest już w ulubionych");
            }
            else{
                set.add(filmID);
                user.setFavoriteMovies(set);
                userRepository.save(user);
                return ResponseEntity.ok("Film został dodany do ulubionych");
            }

        }
        else
        {
            throw new UserNotFoundException("Użytkownika nie znaleziono");
        }
    }

    public ResponseEntity<String> deleteFavorite(String emailorUsername, int filmID) {
        Optional<User> userOptional = userRepository.findByEmailOrName(emailorUsername, emailorUsername);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Set<Integer> set = new HashSet<>(user.getFavoriteMovies());
            if (set.contains(filmID)) {
                set.remove(filmID);
                user.setFavoriteMovies(set);
                userRepository.save(user);
                return ResponseEntity.ok("Film został usunięty z ulubionych");
            }
            else {
                throw new FavoriteFilmNotFoundException("Nie znaleziono filmu w ulubionych");
            }
        }
        else
        {
            throw new UserNotFoundException("Użytkownika nie znaleziono");
        }
    }

    public Set<Integer> getFavoriteMovies(String emailorUsername) {
        Optional<User> userOptional = userRepository.findByEmailOrName(emailorUsername, emailorUsername);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getFavoriteMovies();
        }
        else{
                throw new UserNotFoundException("Użytkownika nie znaleziono");
        }
    }

}
