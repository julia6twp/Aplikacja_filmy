import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import "../YourAccount.css";

const ChangePasswordForm = ({ userEmail, onCancel }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        alert("Password changed successfully!");
        onCancel();
    };

    return (
        <div className="box-container">
            <div className="box">
                <h2>Change Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className="field"
                        label="Email"
                        variant="filled"
                        fullWidth
                        value={userEmail}
                        disabled
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        className="field"
                        label="Old Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        className="field"
                        label="New Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={Boolean(error)}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        className="field"
                        label="Confirm New Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                        sx={{marginBottom: 2}}
                    />
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                    <Button onClick={onCancel} variant="outlined" sx={{marginLeft: 2}}>Cancel</Button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
