import React from "react";
import {Grid2} from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, title }) => {
    return (
        <>
            {title && (
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "white",marginLeft: "125px", marginBottom: "10px" }}>
                    {title}
                </div>
            )}
        <Grid2 container spacing={2} justifyContent="center">
            {movies.map((movie) => (
                <Grid2 key={movie.id}>
                    <MovieCard id={movie.id} title={movie.title} poster={movie.poster} />
                </Grid2>
            ))}
        </Grid2>
        </>
    );
};

export default MovieList;
