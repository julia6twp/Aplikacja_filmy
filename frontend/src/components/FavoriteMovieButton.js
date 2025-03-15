import React, { useState, useEffect } from "react";

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
        <div onClick={toggleFavorite}>
            {isFavorite ? (
                <span role="img" aria-label="favorite" style={{ fontSize: "30px", color: "red" }}>
                    ❤️
                </span>
            ) : (
                <span role="img" aria-label="not favorite" style={{ fontSize: "30px" }}>
                    🤍
                </span>
            )}
        </div>
    );
};

export default FavoriteMovieButton;
