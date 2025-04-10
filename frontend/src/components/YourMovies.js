import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { Typography } from "@mui/material";
import {fetchMoviePoster} from "../utils/searchQuery";
import {useAuth} from "../utils/auth";

const YourMovies = () => {
    const [savedMovies, setSavedMovies] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        const fetchSavedMovies = async () => {
            if (auth.user) {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/favoritefilm/${auth.user?.name}`);
                    if (response.ok) {
                        const movieIds = await response.json();
                        const moviesWithPosters = await Promise.all(
                            movieIds.map(async (movieId) => {
                                const posterUrl = await fetchMoviePoster(movieId);
                                return {
                                    id: movieId,
                                    title: movieId.title,
                                    poster: posterUrl || "https://via.placeholder.com/300x450?text=No+Image",
                                };
                            })
                        );
                        setSavedMovies(moviesWithPosters);
                    }
                } catch (error) {
                    console.error("Error fetching saved movies:", error);
                }
            }
        };

        fetchSavedMovies();
    }, [auth.user]);

    return (
        <div>
            <Typography variant="h4" sx={{color: "lavender", margin: "auto", textAlign: "center"}}>
                Your saved movies ❤️
            </Typography>
            {savedMovies.length === 0 ? (
                <Typography variant="h6" sx={{color: "gray", textAlign: "center", marginTop: "20px"}}>
                    You haven't saved any movies yet.
                </Typography>
            ) : (
                <MovieList movies={savedMovies} title=""/>
            )}
        </div>
    );
};

export default YourMovies;