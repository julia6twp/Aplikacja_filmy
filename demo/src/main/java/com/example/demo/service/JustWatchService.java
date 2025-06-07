package com.example.demo.service;

import com.example.demo.DTO.MovieItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

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

// zapytanie do TMDB - wyszukiwanie filmu po haśle
    public String searchFilmBySearchTerm(String searchTerm) {
        String url="https://api.themoviedb.org/3/search/movie?query="+searchTerm+"&api_key="+apiKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

// zapytanie do TMBD - pobieranie listy najlepiej ocenianch filmów
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


// zapytanie do TMDB - pobieranie okładki filmu, gdy istnieje
    public String searchFilmPoster(Integer movieId){
        String url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<MovieItem> response = restTemplate.getForEntity(url, MovieItem.class);

        if(response.getBody()!=null && response.getBody().getPoster_path()!=null){
            return "https://image.tmdb.org/t/p/w500"+ response.getBody().getPoster_path();
        }

        return "https://via.placeholder.com/300x450?text=No+Image";
    }

    //zapytanie do TMDB - pobranie szczegółów filmu
    public String searchFilmDetails(Integer movieId){
        String url = apiUrl+movieId+"?api_key="+apiKey+"&append_to_response=watch/providers";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
    //zapytanie do TMDB - pobranie informacji o platformach streaminowych
    public Map<String, Object> searchFilmProviders(Integer movieId){
        String url = apiUrl+movieId+"/watch/providers?api_key="+apiKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, Map.class);
    }

}
