import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";

const VerifyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const email = location.state?.email || "";

    const handleVerify = async () => {
        if (!email) {
            setError("No email found. Please register again.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/mail/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mail: email, code }),
            });

            if (!response.ok) {
                throw new Error("Invalid verification code");
            }

            navigate("/account");
        } catch (error) {
            setError("Invalid verification code");
        }
    };

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

            <div className="box-container">
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
