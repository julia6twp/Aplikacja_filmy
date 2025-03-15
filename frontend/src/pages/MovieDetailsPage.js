import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { fetchMovieDetails } from "../utils/searchQuery";
import Navbar from "../components/Navbar";
import {Box, Typography} from "@mui/material";
import "../MovieDetailsPage.css";
import FavoriteMovieButton from "../components/FavoriteMovieButton";


const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    useEffect(() => {
        if (savedMovies.some((savedMovie) => savedMovie.id === id)) {
            setIsFavorite(true);
        }
    }, [id, savedMovies]);

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
        if (isFavorite) {
            const updatedMovies = savedMovies.filter((movie) => movie.id !== id);
            localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
        } else {
            const updatedMovies = [...savedMovies, movie];
            localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
        }
    };

    useEffect(() => {
        const getMovieDetails = async () => {
            const data = await fetchMovieDetails(id);
            setMovie(data);
        };
        getMovieDetails();
    }, [id]);

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <Box className="movie-details-container">
                <Box className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                </Box>

                <Box className="movie-info">
                    <Typography variant="h4" className="movie-title">
                        {movie.title}
                    </Typography>
                    <Typography variant="h6" className="movie-rating">
                        Raiting: {movie.vote_average}/10⭐
                    </Typography>
                    <Typography variant="body1" className="movie-overview">
                        {movie.overview}
                    </Typography>
                    <FavoriteMovieButton movie={movie}/>

                    {movie["watch/providers"]?.results?.PL ? (
                        movie["watch/providers"].results.PL.flatrate?.length > 0 ? (
                            <Box className="movie-providers">
                                <Typography variant="h6">Available on platforms:</Typography>
                                <Box className="provider-logos">
                                    {movie["watch/providers"].results.PL.flatrate?.map((provider) => (
                                        <img
                                            key={provider.provider_id}
                                            src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                                            alt={provider.provider_name}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        ) : (
                            <Typography variant="body1" color="textSecondary" margin="20px" sx={{color: "grey"}}>
                                No platforms available in Poland.
                            </Typography>
                        )
                    ) : (
                        <Typography variant="body1" color="textSecondary" margin="20px" sx={{color: "grey"}}>
                            No platforms available for Poland.
                        </Typography>
                    )}

                </Box>
            </Box>
        </div>
    );
};

export default MovieDetailsPage;