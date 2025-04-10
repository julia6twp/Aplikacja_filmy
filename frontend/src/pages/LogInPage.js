import { Button} from "@mui/material";
import React, { useState } from "react";
import "../LoginInPage.css";
import TextField from "@mui/material/TextField";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../utils/auth";
import Navbar from "../components/Navbar";
import axios from "axios";


const LoginInPage = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ user: "", password: "" });
    const [loginError, setLoginError] = useState("");
    // Użycie hooka auth dla logowania użytkownika
    const auth = useAuth();
    const navigate = useNavigate()
    // Funkcja obsługująca logowanie użytkownika
    const handleLogin = async () => {
        try {
            // Wysyłanie zapytania POST do serwera
            const response = await axios.post("http://localhost:8080/account/login", {
                login: user,
                password: password
            });

            if (response.data.login && response.data.email) {
                auth.login({
                    name: response.data.login,
                    email: response.data.email
                });

                navigate('/account', { replace: true });

            } else {
                setLoginError("Incorrect login details");
            }
        } catch (error) {
            console.error("Login failed:", error);
            console.error("Login failed:", error.response ? error.response.data : error.message);
            setLoginError("Incorrect data details");
        }
    };
    // Funkcja walidacji formularza
    const validateForm = () => {
        let newErrors = { user: "", password: "" };
        let isValid = true;

        if (!user.trim()) {
            newErrors.user = "Login name or e-mail is required";
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    // Funkcja obsługująca wysyłanie formularza
    const handleSubmit = (e) => {
        e.preventDefault();  // Zatrzymanie przeładowania strony
        if (validateForm()) {
            handleLogin();// Jeśli formularz poprawny, logujemy użytkownika
        } else {
            console.log("Form validation failed");
        }
    };

    return (
        <>
            <Navbar/>
            <div className="box-container1">
                <div className="box">
                    <div>
                        <h2>Login</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className="field"
                            label="Login / e-mail"
                            variant="filled"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            error={Boolean(errors.user)}
                            helperText={errors.user}
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

                    {loginError && <p style={{ color: "red" }}>{loginError}</p>}

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
