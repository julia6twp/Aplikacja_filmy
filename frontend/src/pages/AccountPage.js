import React, {useState} from 'react';
import { AppBar, Toolbar, IconButton, Tabs, Tab, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "react-router-dom";
import YourAccount from "../components/YourAccount";
import YourMovies from "../components/YourMovies";
import YourOpinions from "../components/YourOpinions";

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6">FindYourMovie</Typography>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit">
                            <Tab label="Your account" />
                            <Tab label="Your movies" />
                            <Tab label="Your opinions" />
                        </Tabs>
                    </Box>

                    <IconButton color="inherit" edge="end">
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ marginTop: '80px', padding: '20px' }}>
                {activeTab === 0 && <YourAccount />}
                {activeTab === 1 && <YourMovies />}
                {activeTab === 2 && <YourOpinions />}
            </Box>
        </>
    );
};


export default AccountPage;
