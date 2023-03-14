import { FormControl, InputLabel, TextField } from "@mui/material";
import React from "react";

function InputField({
    value,
    label,
    name,
    type,
    placeholder,
    onChange,
    idName,
    multiline = false,
    fullWidth = false,
}) {
    return (
        <TextField
            sx={{
                width: "100%",
                marginBottom: "1rem",
            }}
            id={idName}
            label={label}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            multiline={multiline}
            rows={multiline ? 4 : 1}
            fullWidth={fullWidth}
        />
    );
}
export default InputField;
