import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useAuth} from "../utils/auth";
import {useNavigate} from "react-router-dom";

const FavoriteMovieButton = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (auth.user) {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/favoritefilm/${auth.user?.name}`);
                    if (response.ok) {
                        const favoriteMovies = await response.json();
                        setIsFavorite(favoriteMovies.includes(movie.id));
                    }
                } catch (error) {
                    console.error("Error fetching favorite movies:", error);
                }
            }
        };
        fetchFavoriteMovies();
    }, [movie.id, auth.user]);

    const toggleFavorite = async () => {
        if (!auth.user) {
            navigate("/login");
            return;
        }

        const url = isFavorite
            ? `http://localhost:8080/api/users/favoritefilm/delete/${auth.user?.name}/${movie.id}`
            : `http://localhost:8080/api/users/favoritefilm/${auth.user?.name}/${movie.id}`;

        try {
            const response = await fetch(url, {
                method: isFavorite ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setIsFavorite(!isFavorite);
            } else {
                console.error("Error updating favorite status.");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
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
