import React, { useState } from "react";
import { Button, Card, Box, CardMedia, Typography } from "@mui/material";

const ProfilePhotoUpdate = ({ selectedFile, setSelectedFile }) => {
    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    objectFit: "cover",
                    width: 100,
                    height: 100,
                    border: "4px solid #eee",
                    borderRadius: "50%",
                }}
                image={selectedFile ? URL.createObjectURL(selectedFile) : ""}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                id="upload-file"
            />
            <label htmlFor="upload-file">
                {selectedFile ? (
                    <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Changer de photo
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Choisir une photo
                    </Button>
                )}
            </label>
        </Box>
    );
};

export default ProfilePhotoUpdate;
