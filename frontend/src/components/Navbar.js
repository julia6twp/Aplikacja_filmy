import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <Typography variant="h6">FindYourMovie</Typography>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
