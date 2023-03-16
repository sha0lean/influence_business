import React from "react";
import { Typography, useTheme } from "@mui/material";

function ProfilAdmin() {
    const theme = useTheme();

    return (
        <>
            <Typography
                variant="h4"
                sx={{
                    marginBottom: "20px",
                }}
            >
                Admin Dashboard
            </Typography>
        </>
    );
}

export default ProfilAdmin;
