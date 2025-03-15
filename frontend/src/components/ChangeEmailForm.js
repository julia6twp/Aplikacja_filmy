import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import "../YourAccount.css";
import {useAuth} from "../utils/auth";

const ChangeEmailForm = ({ userEmail, onCancel }) => {
    const [email, setEmail] = useState(userEmail);
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");
    const auth = useAuth()

    // const { updateEmail } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newEmail.includes("@")) {
            setError("Invalid email format");
            return;
        }
        // updateEmail(newEmail)
        auth.updateEmail(newEmail);
        alert("Email changed successfully!");
        onCancel();
    };

    return (
        <div className="box-container">
            <div className="box">
                <h2>Change Your Email</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className="field"
                        label="Current Email"
                        variant="filled"
                        fullWidth
                        value={email}
                        disabled
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        className="field"
                        label="New Email"
                        variant="filled"
                        fullWidth
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                        sx={{marginBottom: 2}}
                    />
                    <div className="buttons-container">
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                        <Button onClick={onCancel} variant="outlined" sx={{marginLeft: 2}}>Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeEmailForm;
