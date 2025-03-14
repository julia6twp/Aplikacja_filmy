import { Button} from "@mui/material";
import React, { useState } from "react";
import "../LoginInPage.css";
import TextField from "@mui/material/TextField";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../utils/auth";
import Navbar from "../components/Navbar";


const LoginInPage = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ user: "", password: "" });

    const auth = useAuth();
    const navigate = useNavigate()

    const handleLogin = () =>{
        const loggedUser = { user, email: "user@example.com" };
        auth.login(loggedUser);
        navigate('/account', {replace: true})
    }

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

            <div className="box-container">
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
