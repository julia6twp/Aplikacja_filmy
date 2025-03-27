import React, { useState } from "react";
import { Typography } from "@mui/material";
import OpinionList from "../components/OpinionsList";

const YourOpinions = () => {
    const [opinions, setOpinions] = useState([
        { id: 1, text: "Świetny film! Polecam każdemu.", date: "2025-03-25", isEditing: false, originalText: "", username: "ktos" },
        { id: 2, text: "Nie do końca mój klimat, ale da się obejrzeć.", date: "2025-03-24", isEditing: false, originalText: "", username: "loik" },
        { id: 3, text: "Super efekty specjalne, fabuła też niezła!", date: "2025-03-23", isEditing: false, originalText: "", username:"babrb" }
     ]);

    return (
        <>
            <Typography variant="h4" sx={{ color: "lavender", margin: "auto", textAlign: "center", marginBottom: "10px" }}>
                Your saved opinions
            </Typography>

            {opinions.length === 0 ? (
                <Typography variant="h6" sx={{ color: "gray", textAlign: "center" }}>
                    No added opinions yet
                </Typography>
            ) : (
                <OpinionList opinions={opinions} setOpinions={setOpinions} allowEditing={true} allowAdding={false} />
            )}
        </>
    );
};

export default YourOpinions;
