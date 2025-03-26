import React, { useState } from "react";
import { Box, Paper, Typography, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const YourOpinions = () => {
    const [opinions, setOpinions] = useState([
        { id: 1, text: "Świetny film! Polecam każdemu.", date: "2025-03-25", isEditing: false, originalText: "" },
        { id: 2, text: "Nie do końca mój klimat, ale da się obejrzeć.", date: "2025-03-24", isEditing: false, originalText: "" },
        { id: 3, text: "Super efekty specjalne, fabuła też niezła!", date: "2025-03-23", isEditing: false, originalText: "" }
    ]);

    const handleDelete = (id) => {
        setOpinions(opinions.filter((opinion) => opinion.id !== id));
    };

    const toggleEdit = (id) => {
        setOpinions(opinions.map((opinion) =>
            opinion.id === id ? { ...opinion, isEditing: !opinion.isEditing, originalText: opinion.text } : opinion
        ));
    };

    const handleTextChange = (id, newText) => {
        setOpinions(opinions.map((opinion) =>
            opinion.id === id ? { ...opinion, text: newText } : opinion
        ));
    };

    const handleSave = (id) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        setOpinions(opinions.map((opinion) =>
            opinion.id === id ? { ...opinion, isEditing: false, date: formattedDate } : opinion
        ));
    };

    const handleCancel = (id) => {
        setOpinions(opinions.map((opinion) =>
            opinion.id === id ? { ...opinion, isEditing: false, text: opinion.originalText } : opinion
        ));
    };

    return (
        <>
            <Typography variant="h4" sx={{ color: "lavender", margin: "auto", textAlign: "center" }}>
                Your saved opinions
            </Typography>

            <Box sx={{ maxWidth: "800px", margin: "auto", padding: 2 }}>
                {opinions.length === 0 ? (
                    <Typography variant="body1" color="grey" sx={{ textAlign: "center" }}>
                        No opinions yet.
                    </Typography>
                ) : (
                    opinions.map((opinion) => (
                        <Paper key={opinion.id} sx={{
                            padding: 2,
                            marginBottom: 2,
                            backgroundColor: "#333",
                            color: "white",
                            border: "1px solid grey",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "500px",
                        }}>
                            <Typography variant="body2" sx={{ color: "lightblue", marginBottom: "5px" }}>
                                {new Date(opinion.date).toLocaleDateString("pl-PL")}
                            </Typography>

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                {opinion.isEditing ? (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={opinion.text}
                                        onChange={(e) => handleTextChange(opinion.id, e.target.value)}
                                        sx={{ backgroundColor: "white", borderRadius: "4px" }}
                                    />
                                ) : (
                                    <Typography variant="body1" sx={{ flexGrow: 1, marginRight: 2 }}>
                                        {opinion.text}
                                    </Typography>
                                )}

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    {opinion.isEditing ? (
                                        <>
                                            <IconButton onClick={() => handleSave(opinion.id)} sx={{ color: "lightgrey" }}>
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleCancel(opinion.id)} sx={{ color: "grey" }}>
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton onClick={() => toggleEdit(opinion.id)} sx={{ color: "lightgrey" }}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => handleDelete(opinion.id)} sx={{ color: "red" }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    ))
                )}
            </Box>
        </>
    );
};

export default YourOpinions;
