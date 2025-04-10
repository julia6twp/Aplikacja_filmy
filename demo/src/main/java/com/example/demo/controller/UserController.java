package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/delete/{emailorUsername}/{password}")
    public ResponseEntity<String> deleteUser(@PathVariable String emailorUsername, @PathVariable String password) {
        return userService.deleteUser(emailorUsername, password);
    }

    @PostMapping("/favoritefilm/{emailorUsername}/{filmID}")
    public ResponseEntity<String> addFavorite(@PathVariable String emailorUsername, @PathVariable int filmID) {
        return userService.addFavorite(emailorUsername, filmID);
    }

    @DeleteMapping("/favoritefilm/delete/{emailorUsername}/{filmID}")
    public ResponseEntity<String> deleteFavoriteFilm(@PathVariable String emailorUsername, @PathVariable int filmID) {
        return userService.deleteFavorite(emailorUsername, filmID);
    }

    @GetMapping("/favoritefilm/{emailorUsername}")
    public Set<Integer> getFavoriteMovies(@PathVariable String emailorUsername) {
        return userService.getFavoriteMovies(emailorUsername);
    }

}
