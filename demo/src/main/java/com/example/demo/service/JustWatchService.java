package com.example.demo.service;

import com.example.demo.model.MovieItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class JustWatchService {
    private final String apiUrl="https://api.themoviedb.org/3/movie/";

    @Value("${justwatch.api.key}")
    private String apiKey;

    //nie używać
    public String getFilmInfo(String title) {
        String url=apiUrl+title+"/watch/providers?api_key="+apiKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }


    public String searchFilmBySearchTerm(String searchTerm) {
        String url="https://api.themoviedb.org/3/search/movie?query="+searchTerm+"&api_key="+apiKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }


    public String searchTopRankedFilms(){
        String url="https://api.themoviedb.org/3/movie/top_rated?api_key="+apiKey+"&language=en-US&page=1";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }


    public String searchPopularFilms(){
        String url="https://api.themoviedb.org/3/movie/popular?api_key="+apiKey+"&language=en-US&page=1";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }



    public String searchFilmPoster(Integer movieId){
        String url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<MovieItem> response = restTemplate.getForEntity(url, MovieItem.class);

        if(response.getBody()!=null && response.getBody().getPoster_path()!=null){
            return "https://image.tmdb.org/t/p/w500"+ response.getBody().getPoster_path();
        }

        return "https://via.placeholder.com/300x450?text=No+Image";
    }

}
