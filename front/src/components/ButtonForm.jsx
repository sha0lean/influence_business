import { Button } from "@mui/material";
import React from "react";

function ButtonForm({
    content,
    onClick,
    size = "medium",
    variant = "contained",
    sx = {},
}) {
    return (
        <Button
            size={size}
            variant={variant}
            color="primary"
            type="submit"
            value={content}
            onClick={onClick}
            sx={sx}
        >
            {content}
        </Button>
    );
}
export default ButtonForm;
