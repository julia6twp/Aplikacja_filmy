import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const MovieCard = ({ title, poster }) => {
    return (
        <Card sx={{ width: 200, position: "relative", borderRadius: 2, overflow: "hidden", margin: "18px" }}>
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
                    padding: "2px",
                    textAlign: "center",
                }}
            >
                <Typography variant="subtitle1">{title}</Typography>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
