import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import "../YourAccount.css";
import {useLocation, useNavigate} from "react-router-dom";

const NewPasswordPage = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Wysłanie żądania resetowania hasła
            const response = await axios.post("http://localhost:8080/account/resetPassword", {
                mail: email,
                newPassword: newPassword,
            });

            if (response.status === 200) {
                alert("Password changed successfully!");
                navigate("/login");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error("Password reset error:", error);
        }
    };

    return (
        <div className="box-container">
            <div className="box">
                <h2>Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className="field"
                        label="Email"
                        variant="filled"
                        fullWidth
                        value={email}
                        disabled
                        sx={{ marginBottom: 2, backgroundColor: "grey", borderRadius: 1 }}
                    />
                    <TextField
                        className="field"
                        label="New Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={Boolean(error)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        className="field"
                        label="Confirm New Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                    {/*<Button onClick={() => navigate("/account")} variant="outlined" sx={{ marginLeft: 2 }}>*/}
                    {/*    Cancel*/}
                    {/*</Button>*/}
                </form>
            </div>
        </div>
    );
};

export default NewPasswordPage;
