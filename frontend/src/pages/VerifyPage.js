import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";

const VerifyPage = () => {
    // Hooki do nawigacji, dostępu do lokalizacji oraz stany formularza
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const email = location.state?.email || "";
    // Funkcja obsługująca weryfikację kodu
    const handleVerify = async () => {
        if (!email) {
            setError("No email found. Please register again.");
            return;
        }

        try {
            // Wysyłanie zapytania do backendu w celu weryfikacji kodu
            const response = await fetch("http://localhost:8080/mail/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mail: email, code }),// Przesyłanie e-maila i kodu weryfikacyjnego
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }
            // Jeśli weryfikacja się powiedzie, informujemy użytkownika i przekierowujemy na stronę konta
            alert("Account created successfully!");
            navigate("/account");
        } catch (error) {
            setError("Invalid verification code");
        }
    };
    // Funkcja obsługująca zmiany w polu tekstowym (weryfikacja kodu)
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCode(value);
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

            <div className="box-container" style={{marginTop: "80px"}}>
                <div className="box">
                    <h2>Verify Your Account</h2>
                    <p style={{ color: "white" }}>Check your email and enter the verification code.</p>

                    <TextField
                        className="field"
                        label="Verification Code"
                        variant="filled"
                        fullWidth
                        value={code}
                        onChange={handleChange}
                        error={Boolean(error)}
                        helperText={error}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={handleVerify}
                    >
                        Verify
                    </Button>
                </div>
            </div>
        </>
    );
};

export default VerifyPage;
