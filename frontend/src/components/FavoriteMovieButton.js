import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriteMovieButton = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
        if (savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
            setIsFavorite(true);
        }
    }, [movie.id]);

    const toggleFavorite = () => {
        const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
        if (isFavorite) {
            const updatedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== movie.id);
            localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
        } else {
            const updatedMovies = [...savedMovies, movie];
            localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <IconButton onClick={toggleFavorite} aria-label="toggle favorite" sx={{marginLeft: "15px" }}>
            {isFavorite ? (
                <FavoriteIcon sx={{ fontSize: 45, color: "red" }} />
            ) : (
                <FavoriteBorderIcon sx={{ fontSize: 45, color: "white" }} />
            )}
        </IconButton>
    );
};

export default FavoriteMovieButton;
