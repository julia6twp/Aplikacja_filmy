import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { searchMoviesBySearchTerm, searchTopRankedMovies } from "../utils/searchQuery";

const SearchPage = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("Top Ranked Movies");

    const fetchMovies = async (searchTerm = "") => {
        let data;
        if (searchTerm === "") {
            data = await searchTopRankedMovies();
            setTitle("Top Ranked Movies");
        } else {
            data = await searchMoviesBySearchTerm(searchTerm);
            setTitle(`Results for "${searchTerm}"`);
        }

        if (data && data.results) {
            setMovies(
                data.results.map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                }))
            );
        } else {
            setMovies([]);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleSearch = (searchTerm) => {
        fetchMovies(searchTerm);
    };

    return (
        <>
            <div>
                <SearchBar onSearch={handleSearch} />
            </div>
            <div>
                <MovieList movies={movies} title={title} />
            </div>
        </>
    );
};

export default SearchPage;
