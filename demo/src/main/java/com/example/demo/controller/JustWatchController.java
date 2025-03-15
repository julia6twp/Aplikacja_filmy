package com.example.demo.controller;

import com.example.demo.service.JustWatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/justwatch")
public class JustWatchController {

    private final JustWatchService justWatchService;

    @Autowired
    public JustWatchController(JustWatchService justWatchService) {
        this.justWatchService = justWatchService;
    }


    @GetMapping("/film/{filmName}")
    public String getFilm(@PathVariable String filmName) {
        return justWatchService.getFilmInfo(filmName);
    }


    @GetMapping("/searchTerm/{searchTerm}")
    public String searchFilmBySearchTerm(@PathVariable String searchTerm) {
        return justWatchService.searchFilmBySearchTerm(searchTerm);
    }

    @GetMapping("/searchTopRanked")
    public String searchTopRankedFilms(){
        return justWatchService.searchTopRankedFilms();
    }

    @GetMapping("/searchPopularFilms")
    public String searchPopularFilms(){
        return justWatchService.searchPopularFilms();
    }

    @GetMapping("/{id}/poster")
    public String getFilmPoster(@PathVariable Integer id) {
    return justWatchService.searchFilmPoster(id);
    }

}
