import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {fetchMovieDetails, fetchMoviePoster} from "../utils/searchQuery";
import Navbar from "../components/Navbar";
import {Box, Typography} from "@mui/material";
import "../MovieDetailsPage.css";
import FavoriteMovieButton from "../components/FavoriteMovieButton";
import OpinionList from "../components/OpinionsList";

const MovieDetailsPage = () => {
    const { id } = useParams(); // pobranie ID filmu z URL
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [poster, setPoster] = useState(null);

    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    const [opinions, setOpinions] = useState([
        // { id: 1, text: "Świetny film! Polecam każdemu.", date: "2025-03-25", isEditing: false, originalText: "" },
    ]);
    // Sprawdzenie, czy dany film jest już zapisany jako ulubiony
    useEffect(() => {
        if (savedMovies.some((savedMovie) => savedMovie.id === id)) {
            setIsFavorite(true);
        }
    }, [id, savedMovies]);
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
                        <FavoriteMovieButton movie={movie} />
                    </Typography>
                    <Typography variant="h6" className="movie-rating">
                        Rating: {movie.vote_average}/10⭐
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
            <OpinionList opinions={opinions} setOpinions={setOpinions} allowEditing={false} allowAdding={true}/>
        </div>
    );
};

export default MovieDetailsPage;
