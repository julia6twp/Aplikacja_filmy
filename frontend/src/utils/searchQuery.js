import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BACKEND_URL = "http://localhost:8080/justwatch";
// Funkcja do wyszukiwania filmów na podstawie podanego terminu
export const searchMoviesBySearchTerm = async (searchTerm) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/searchTerm/${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

// Funkcja do wyszukiwania najwyżej ocenianych filmów
export const searchTopRankedMovies = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/searchTopRanked`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top-ranked movies:", error);
        return null;
    }
};
// Funkcja do wyszukiwania popularnych filmów
export const searchPopularMovies = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/searchPopularFilms`);
        return response.data;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return null;
    }
};
// Funkcja do pobierania szczegółowych informacji o filmie z TMDB
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=watch/providers`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};
// Funkcja do pobierania plakatu filmu z lokalnego backendu
export const fetchMoviePoster = async (movieId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/${movieId}/poster`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie poster:", error);
        return null;
    }
};