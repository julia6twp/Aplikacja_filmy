import React from "react";
import {useNavigate} from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const MovieCard = ({ id, title, poster }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                width: 200,
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                margin: "18px",
                cursor: "pointer",
                border: "solid 1px grey",
                boxShadow: "10px 10px 10px #000000",
                transition: "all 0.4s ease-in-out",
                "&:hover": {

                    transform: "scale(1.10)",
                },
            }}
        >
            <CardMedia
                component="img"
                height="300"
                image={poster}
                alt={title}
            />
            <CardContent
                sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "4px",
                    textAlign: "center",
                }}
            >
                <Typography variant="subtitle1">{title}</Typography>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
