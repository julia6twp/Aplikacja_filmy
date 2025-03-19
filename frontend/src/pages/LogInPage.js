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
    const [errorMessage, setErrorMessage] = useState("");
    const [loginError, setLoginError] = useState("");

    const auth = useAuth();
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/account/login", { username: user, password });

            if (response.data === "Zalogowano pomyślnie") {
                // const userData = { user: user, email: response.data.email };
                auth.login({ user: user });
                navigate('/account', { replace: true });
            } else {
                setLoginError(response.data);
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError("An error occurred while logging in");
        }
    };

    const validateForm = () => {
        let newErrors = { user: "", password: "" };
        let isValid = true;

        if (!user.trim()) {
            newErrors.user = "Login name is required";
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
        e.preventDefault();  // Zatrzymanie przeładowania strony
        if (validateForm()) {
            handleLogin();
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
                            label="Login name"
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
