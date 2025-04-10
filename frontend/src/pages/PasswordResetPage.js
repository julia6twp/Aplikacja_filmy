import { AppBar, Box, Button, Toolbar, Typography, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import {Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";

const PasswordResetPage = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    // Funkcja walidująca formularz
    const validateForm = () => {
        let newErrors = {};
        if (!email.trim()) {
            newErrors.email = "E-mail is required";
        }  else if (!email.includes("@")) {
            newErrors.email = "Invalid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
// Funkcja obsługująca wysłanie formularza
    const handleSubmit = async (e) => {
        e.preventDefault(); // Zatrzymanie przeładowania strony

        if (validateForm()) {
            try {
                // Wysyłanie żądania do API o resetowanie hasła
                const response = await fetch(`http://localhost:8080/mail/send/${email}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({}),
                });

                if (!response.ok) {
                    setErrors({ email: "Failed to send reset code" });
                    return;
                }

                setSuccessMessage("If this e-mail is registered, you will receive reset instructions.");
                setTimeout(() => {
                    navigate("/verifyReset", { state: { email } });
                }, 2000);
            } catch (error) {
                setErrors({ email: "Error sending mail. Try again later." });
            }
        }
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                        <Typography variant="h6">FindYourMovie</Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <div className="box-container1">
                <div className="box">
                    <h2>Forgot your password?</h2>
                    <p style={{ color: "white" }}>Enter your e-mail to reset your password.</p>

                    {successMessage && <Alert severity="success">{successMessage}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            className="field"
                            label="E-mail"
                            variant="filled"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Continue
                        </Button>
                    </form>

                    <div>
                        <p style={{ color: "white" }}>
                            Back to the <Link to="/login" style={{ color: "LightBlue" }}>login page</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordResetPage;
