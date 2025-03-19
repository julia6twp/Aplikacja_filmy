import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { Typography } from "@mui/material";

const YourMovies = () => {
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedMovies")) || [];
        const formattedMovies = saved.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image",
        }));
        setSavedMovies(formattedMovies);
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
