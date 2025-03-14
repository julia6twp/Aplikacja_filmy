import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import '../YourAccount.css';
import {useAuth} from "../utils/auth";
import {useNavigate} from "react-router-dom";

const YourAccount = () => {
    const [view, setView] = useState("account");
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () =>{
        auth.logout()
        navigate('/')
    }

    return (
        <div className="box-container">
            <div className="box">
                {view === "account" && (
                <>
                    <h2>
                        Your Data
                    </h2>
                    <Typography variant="h5" sx={{color: 'white'}}>
                        Email: {auth.user?.email}
                    </Typography>
                    <Typography variant="h5" sx={{color: 'white'}}>
                        Login: {auth.user?.user}
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
                    <Button
                        variant="contained"
                        sx={{marginTop: 6}}
                        color="secondary"
                        onClick={handleLogout}
                    >
                       Logout
                    </Button>
                </>
            )}

                {view === "changeEmail" &&
                    <ChangeEmailForm userEmail={auth.user.email} onCancel={() => setView("account")}/>}
                {view === "changePassword" &&
                    <ChangePasswordForm userEmail={auth.user.email} onCancel={() => setView("account")}/>}
            </div>
        </div>
    );
};

export default YourAccount;
