import React from "react";

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

function InputList({ valuesOption, value, handleChange, label }) {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleChange}
                value={value}
            >
                {valuesOption.map((item, index) => (
                    <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={item}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
export default InputList;
