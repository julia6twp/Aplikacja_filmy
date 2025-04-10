import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {fetchMovieDetails, fetchMoviePoster} from "../utils/searchQuery";
import Navbar from "../components/Navbar";
import {Box, Typography} from "@mui/material";
import "../MovieDetailsPage.css";
import FavoriteMovieButton from "../components/FavoriteMovieButton";
import OpinionList from "../components/OpinionsList";
import {useAuth} from "../utils/auth";

const MovieDetailsPage = () => {
    const { id } = useParams(); // pobranie ID filmu z URL
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [poster, setPoster] = useState(null);
    const [opinions, setOpinions] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        const getMovieDetails = async () => {
            const data = await fetchMovieDetails(id);
            setMovie(data);
            const posterUrl = await fetchMoviePoster(id);
            setPoster(posterUrl);
        };
        getMovieDetails();
    }, [id]);

    // Pobranie szczegółów filmu i plakatu po załadowaniu komponentu
    useEffect(() => {
        const getMovieDetails = async () => {
            const data = await fetchMovieDetails(id);
            setMovie(data);
            const posterUrl = await fetchMoviePoster(id);
            setPoster(posterUrl);
        };
        getMovieDetails();
    }, [id]);

    useEffect(() => {
        const getOpinions = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/comment/get/${id}`);
                const data = await res.json();
                setOpinions(data);
            } catch (err) {
                console.error("Błąd podczas pobierania opinii:", err);
            }
        };

        getOpinions();
    }, [id]);

    // Check if the movie is marked as favorite by the user
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (auth.user) {
                try {
                    const response = await fetch(`http://localhost:8080/api/users/favoritefilm/${auth.user?.name}`);
                    const favoriteMovies = await response.json();
                    setIsFavorite(favoriteMovies.includes(id)); // Check if the current movie ID is in the list of favorites
                } catch (err) {
                    console.error("Error checking favorite status:", err);
                }
            }
        };

        if (auth.user) {
            checkFavoriteStatus();
        }
    }, [auth.user, id]);

    // Add or remove the movie from favorites
    const toggleFavorite = async () => {
        if (auth.user) {
            try {
                const method = isFavorite ? "DELETE" : "POST";
                const url = `http://localhost:8080/api/users/favoritefilm/${auth.user.username}/${id}`;
                const response = await fetch(url, { method });

                if (response.ok) {
                    setIsFavorite(!isFavorite);
                } else {
                    console.error("Error toggling favorite status");
                }
            } catch (err) {
                console.error("Error toggling favorite:", err);
            }
        }
    };

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <Box className="movie-details-container">
                <Box className="movie-poster">
                    <img src={poster} alt={movie.title} />
                </Box>

                <Box className="movie-info">
                    <Typography variant="h4" className="movie-title">
                        {movie.title}
                        <FavoriteMovieButton movie={movie} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

                    </Typography>
                    <Typography variant="h6" className="movie-rating">
                        IMDB rating: {movie.vote_average.toFixed(1)}/10⭐
                    </Typography>
                    <Typography variant="body1" className="movie-overview">
                        {movie.overview}
                    </Typography>

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
            <OpinionList opinions={opinions} setOpinions={setOpinions} allowEditing={false} allowAdding={true} filmID={parseInt(id)}/>
        </div>
    );
};

export default MovieDetailsPage;
