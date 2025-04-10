import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ChangeLoginForm from './ChangeLoginForm';
import ChangePasswordForm from './ChangePasswordForm';
import '../YourAccount.css';
import {useAuth} from "../utils/auth";// Hook do pobierania danych o użytkowniku
import {useNavigate} from "react-router-dom";

const YourAccount = () => {
    // Stan do przechowywania widoku (dane użytkownika, zmiana loginu, zmiana hasła)
    const [view, setView] = useState("account");
    const auth = useAuth()   //hook do pobrania danych o użytkowniku
    const navigate = useNavigate()
    // Funkcja obsługująca wylogowanie
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
                        Login:  {auth.user?.name}
                    </Typography>
                    <Typography variant="h5" sx={{color: 'white'}}>
                        Email:  {auth.user?.email}
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{marginTop: 2, marginRight: 1}}
                        onClick={() => setView("changeLogin")}
                    >
                        Change your login
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

                {view === "changeLogin" && <ChangeLoginForm onCancel={() => setView("account")} />}
                {view === "changePassword" && <ChangePasswordForm onCancel={() => setView("account")} />}

            </div>
        </div>
    );
};

export default YourAccount;
