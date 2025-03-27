import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { Typography } from "@mui/material";
import {fetchMoviePoster} from "../utils/searchQuery";

const YourMovies = () => {
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedMovies")) || [];

        const fetchPosters = async () => {
            const moviesWithPosters = await Promise.all(
                saved.map(async (movie) => {
                    const posterUrl = await fetchMoviePoster(movie.id);
                    return {
                        id: movie.id,
                        title: movie.title,
                        poster: posterUrl || "https://via.placeholder.com/300x450?text=No+Image",
                    };
                })
            );
            setSavedMovies(moviesWithPosters);
        };

        fetchPosters();
    }, []);

    return (
        <div >
            <Typography variant="h4" sx={{color: "lavender", margin:"auto", textAlign:"center"}} >
                Your saved movies ❤️
            </Typography>
            <MovieList movies={savedMovies} title="" />
        </div>
    );
};

export default YourMovies;
