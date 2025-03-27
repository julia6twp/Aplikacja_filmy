import React, { useState } from "react";
import { Paper, Typography, IconButton, TextField, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {useAuth} from "../utils/auth";
import {useNavigate} from "react-router-dom";

const OpinionList = ({ opinions, setOpinions, allowEditing, allowAdding }) => {
    const [newComment, setNewComment] = useState("");
    const [isAddingComment, setIsAddingComment] = useState(false);
    const auth = useAuth()
    const navigate = useNavigate();

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
        const formattedDate = new Date().toISOString().split('T')[0];

        setOpinions(opinions.map((opinion) =>
            opinion.id === id ? { ...opinion, isEditing: false, date: formattedDate } : opinion
        ));
    };

    const handleCancel = (id) => {
        setOpinions(opinions.map((opinion) =>
            opinion.id === id ? { ...opinion, isEditing: false, text: opinion.originalText } : opinion
        ));
    };

    const handleAddComment = () => {
        if (!auth.user) {
            navigate("/login");
            return;
        }
        setIsAddingComment(true);
        if (newComment.trim()) {
            const loggedInUser = auth.user ? auth.user.name : "Unknown User";
            const newOpinion = {
                id: new Date().toISOString(),
                text: newComment,
                date: new Date().toISOString().split('T')[0],
                isEditing: false,
                originalText: newComment,
                username: loggedInUser,
            };
            setOpinions([newOpinion, ...opinions]);
            setNewComment("");
            setIsAddingComment(false);
        }
    };

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: 2 }}>
            {allowAdding && (
                isAddingComment ? (
                    <Paper sx={{
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

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                }}
                            />
                            <IconButton onClick={handleAddComment} sx={{ color: "lightgrey" }} disabled={!newComment.trim()}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton onClick={() => setIsAddingComment(false)} sx={{ color: "grey" }}>
                                <CancelIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                ) : (
                    <Box sx={{ textAlign: "center" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={() => setIsAddingComment(true)}
                            onClick={handleAddComment}
                            sx={{ backgroundColor: "lightblue", color: "black", marginBottom: "15px" }}
                        >
                            Add Comment
                        </Button>
                    </Box>
                )
            )}

            {/* Wyświetlanie opinii lub komunikatu "Brak komentarzy" */}
            {opinions.length > 0 ? (
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
                            {new Date(opinion.date).toLocaleDateString("pl-PL")} - {opinion.username}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            {opinion.isEditing ? (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={opinion.text}
                                        onChange={(e) => handleTextChange(opinion.id, e.target.value)}
                                        sx={{ backgroundColor: "white", borderRadius: "4px" }}
                                    />
                                    <IconButton onClick={() => handleSave(opinion.id)} sx={{ color: "lightgrey" }}>
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleCancel(opinion.id)} sx={{ color: "grey" }}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Typography variant="body1" sx={{ flexGrow: 1, marginRight: 2 }}>
                                    {opinion.text}
                                </Typography>
                            )}

                            <Box sx={{ display: "flex", gap: 1 }}>
                                {allowEditing && !opinion.isEditing && (
                                    <IconButton onClick={() => toggleEdit(opinion.id)} sx={{ color: "lightgrey" }}>
                                        <EditIcon />
                                    </IconButton>
                                )}
                                {allowEditing && (
                                    <IconButton onClick={() => handleDelete(opinion.id)} sx={{ color: "red" }}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                ))
            ) : (
                <Typography variant="h6" sx={{ color: "gray", textAlign: "center" }}>
                    No comments added
                </Typography>
            )}
        </Box>
    );
};

export default OpinionList;
