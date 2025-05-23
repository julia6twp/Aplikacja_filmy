import {  Button } from "@mui/material";
import React, { useState } from "react";
import '../LoginInPage.css';
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {useAuth} from "../utils/auth";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const { register } = useAuth();// funkcja do rejestracji użytkownika z kontekstu autoryzacji
    // Walidacja pól formularza
    const validateForm = () => {
        let newErrors = {};

        if (!name.trim()) {
            newErrors.login = "Login name is required";
        }

        if (!email.trim()) {
            newErrors.email = "E-mail is required";
        } else if (!email.includes("@")) {
            newErrors.email = "Invalid email address";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Please repeat the password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Obsługa kliknięcia przycisku rejestracji
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (validateForm()) {
            const result = await register(name, email, password); // rejestracja użytkownika
            if (result) {
                navigate("/verify", { state: { email } });
            } else {
                setServerError("Registration failed. Try again.");
            }
        }
    };

    return (
        <>
            <Navbar/>
            <div className="box-container1">
                <div className="box">
                    <h2>Create an account</h2>

                    {serverError && <p style={{ color: "red" }}>{serverError}</p>}

                    <TextField
                        className="field"
                        required
                        label="Login name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.login}
                        helperText={errors.login}
                    />

                    <TextField
                        className="field"
                        required
                        label="E-mail"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        className="field"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />

                    <TextField
                        className="field"
                        label="Repeat Password"
                        type="password"
                        variant="filled"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />

                    <Button variant="contained" color="primary" sx={{marginTop: 2}} onClick={handleSubmit}>
                        Sign Up
                    </Button>

                    <p style={{color: 'white'}}>
                        Do you already have an account? <Link to="/login" style={{color: 'LightBlue'}}>Log In</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
