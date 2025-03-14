import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import "../LoginInPage.css";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const LoginInPage = () => {
    const [emailOrLogin, setEmailOrLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ emailOrLogin: "", password: "" });

    const validateForm = () => {
        let newErrors = { emailOrLogin: "", password: "" };
        let isValid = true;

        if (!emailOrLogin.trim()) {
            newErrors.emailOrLogin = "Login name or e-mail is required";
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();  //zatzymanie przeladwania strony
        if (validateForm()) {
            console.log("Logging in with:", emailOrLogin, password);
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
                    <div>
                        <h2>Login</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className="field"
                            label="Login name / E-mail"
                            variant="filled"
                            value={emailOrLogin}
                            onChange={(e) => setEmailOrLogin(e.target.value)}
                            error={Boolean(errors.emailOrLogin)}
                            helperText={errors.emailOrLogin}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            className="field"
                            label="Password"
                            type="password"
                            variant="filled"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Log In
                        </Button>
                    </form>

                    <div>
                        <p style={{color: "white"}}>
                            Don't have an account? <Link to="/signup" style={{color: "LightBlue"}}>Sign Up</Link>
                        </p>
                        <p style={{color: 'white'}}>
                            Forgot a password? <Link to="/resetPassword" style={{color: 'LightBlue'}}>Click here!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginInPage;
