import { Box, List, ListItem, Checkbox, Chip } from "@mui/material";

import React from "react";

function UnordonedList({
    valuesOption,
    selectedFromList,
    setSelectedFromList,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 1.5,
                bgcolor: "background.default",
            }}
        >
            {valuesOption.map((value, index) => (
                <Chip
                    sx={{
                        m: 0.5,
                        "& .MuiChip-deleteIcon": {
                            color: "white",
                        },
                    }}
                    onClick={() => {
                        if (selectedFromList.includes(value)) {
                            setSelectedFromList(
                                selectedFromList.filter(
                                    (item) => item !== value
                                )
                            );
                        } else {
                            setSelectedFromList([...selectedFromList, value]);
                        }
                    }}
                    variant={
                        selectedFromList.includes(value)
                            ? "default"
                            : "outlined"
                    }
                    key={index}
                    label={value}
                    color="primary"
                />
            ))}
        </Box>
    );
}
export default UnordonedList;
