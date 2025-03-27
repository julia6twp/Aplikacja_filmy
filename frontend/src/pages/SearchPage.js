import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import {fetchMoviePoster, searchMoviesBySearchTerm, searchTopRankedMovies} from "../utils/searchQuery";
import {IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("Top Ranked Movies");
    const navigate = useNavigate();

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
            const moviesWithPosters = await Promise.all(
                data.results.map(async (movie) => {
                    const posterUrl = await fetchMoviePoster(movie.id);
                    return {
                        id: movie.id,
                        title: movie.title,
                        poster: posterUrl //|| "https://via.placeholder.com/300x450?text=No+Image"
                    };
                })
            );
            setMovies(moviesWithPosters);
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

    const handleProfileClick=()=>{
        navigate("/account")
    };

    return (
        <>
            <h1>Find your movie</h1>
            <div className="account">
                <IconButton onClick={handleProfileClick}>
                    <AccountCircleIcon fontSize="large" sx={{color: 'white'}}/>
                </IconButton>
            </div>
            <div>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div>
                <MovieList movies={movies} title={title}/>
            </div>
        </>
    );
};

export default SearchPage;
