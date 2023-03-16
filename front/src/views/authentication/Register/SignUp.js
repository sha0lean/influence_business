import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import React from "react";
import InputField from "../../../components/InputField";
import InputList from "../../../components/InputList";

const SignUp = ({
    firstName,
    handleFirstNameChange,

    lastName,
    handleLastNameChange,

    email,
    handleEmailChange,

    password,
    handlePasswordChange,

    role,
    handleRoleChange,

    valuesOption,
    hiddenShowPassword,
    showNext,
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <InputField
                    label={"Prénom"}
                    name={"firstname"}
                    type={"text"}
                    value={firstName}
                    placeholder={"Prénom"}
                    onChange={handleFirstNameChange}
                />

                <InputField
                    label={"Nom"}
                    name={"lastname"}
                    type={"text"}
                    value={lastName}
                    placeholder={"Nom"}
                    onChange={handleLastNameChange}
                />
            </Box>

            <InputField
                label={"Adresse mail"}
                value={email}
                type={"email"}
                placeholder={"Adresse mail"}
                idName={"inputField-email"}
                onChange={handleEmailChange}
            />

            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                    Mot de passe
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visi bility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOffRounded />
                                ) : (
                                    <VisibilityRounded />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Box sx={{ marginY: 2 }}>
                <InputList
                    label={
                        " Quelle est votre position au sein d'influenceur business ?"
                    }
                    value={role}
                    valuesOption={valuesOption}
                    handleChange={handleRoleChange}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Button
                    variant="contained"
                    onClick={showNext}
                    sx={{ marginTop: 2 }}
                >
                    Suivant
                </Button>
            </Box>
        </Box>
    );
};

export default SignUp;
