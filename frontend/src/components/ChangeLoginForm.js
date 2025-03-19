import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import "../YourAccount.css";
import { useAuth } from "../utils/auth";

const ChangeLoginForm = ({ userEmail, currentLogin, onCancel }) => {
    const [login, setLogin] = useState(currentLogin);
    const [newLogin, setNewLogin] = useState("");
    const [error, setError] = useState("");
    const auth = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newLogin.trim()) {
            setError("Login cannot be empty");
            return;
        }

        auth.updateLogin(newLogin);
        alert("Login changed successfully!");
        onCancel();
    };

    return (
        <div className="box-container">
            <div className="box">
                <h2>Change Your Login</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className="field"
                        label="Email"
                        variant="filled"
                        fullWidth
                        value={userEmail}
                        disabled
                        sx={{ marginBottom: 2, backgroundColor: "grey", borderRadius: 1 }}
                    />
                    <TextField
                        className="field"
                        label="Current Login"
                        variant="filled"
                        fullWidth
                        value={login}
                        disabled
                        sx={{ marginBottom: 2, backgroundColor: "grey", borderRadius: 1 }}
                    />
                    <TextField
                        className="field"
                        label="New Login"
                        variant="filled"
                        fullWidth
                        value={newLogin}
                        onChange={(e) => setNewLogin(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                        sx={{ marginBottom: 2 }}
                    />
                    <div className="buttons-container">
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                        <Button onClick={onCancel} variant="outlined" sx={{ marginLeft: 2 }}>Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeLoginForm;
