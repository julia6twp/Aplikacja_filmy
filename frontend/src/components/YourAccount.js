import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import '../YourAccount.css';

const YourAccount = () => {
    const [view, setView] = useState("account");

    const user = {
        login: "Paula",
        email: "paula@example.com",
    };

    return (
        <div className="box-container">
            <div className="box">
                {view === "account" && (
                <>
                    <h2>
                        Your Data
                    </h2>
                    <Typography variant="h5" sx={{color: 'white'}}>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="h5" sx={{color: 'white'}}>
                        Login: {user.login}
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{marginTop: 2, marginRight: 1}}
                        onClick={() => setView("changeEmail")}
                    >
                        Change your email
                    </Button>
                    <Button
                        variant="contained"
                        sx={{marginTop: 2}}
                        onClick={() => setView("changePassword")}
                    >
                        Change your password
                    </Button>
                </>
            )}

                {view === "changeEmail" &&
                    <ChangeEmailForm userEmail={user.email} onCancel={() => setView("account")}/>}
                {view === "changePassword" &&
                    <ChangePasswordForm userEmail={user.email} onCancel={() => setView("account")}/>}
            </div>
        </div>
    );
};

export default YourAccount;
