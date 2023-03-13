import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import React from "react";
import { addCompetence, addSousCompetence } from "../services/user";
import { getToken } from "../utils/localStorage/useToken";

const AddCompetence = ({ label, setOpen, id, order, competenceId }) => {
    const [name, setName] = React.useState("");
    const [value, setValue] = React.useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        if (label === "competence") {
            const data = {
                token: getToken(),
                name,
                value,
                order,
                id_entrepreneur: id,
            };
            addCompetence(data);
        } else {
            console.log("here");
            const data = {
                token: getToken(),
                name,
                value,
                id_competence: competenceId,
                id_entrepreneur: id,
            };
            console.log(data);
            addSousCompetence(data);
        }
        setOpen(false);
        window.location.reload();
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <form>
            <DialogTitle>Ajouter une {label}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nom"
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Valeur"
                    fullWidth
                    type="number"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={onClose}>
                    Annuler
                </Button>
                <Button size="small" onClick={handleSubmit} variant="contained">
                    Ajouter
                </Button>{" "}
            </DialogActions>
        </form>
    );
};

export default AddCompetence;
