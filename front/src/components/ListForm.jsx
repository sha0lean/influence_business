import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    TextField,
    Typography,
} from "@mui/material";
import ButtonForm from "./ButtonForm";

function ListItemExperience({ onClose, onSubmit }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            company,
            position,
            startDate,
            endDate,
            description,
        });
        onClose();
    };

    return (
        <form>
            <DialogTitle>Add listItem</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Entreprise"
                    fullWidth
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Position"
                    fullWidth
                    value={position}
                    onChange={(event) => setPosition(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Date de début"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Date de fin"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
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
}

function ListItemDiplome({ onClose, onSubmit }) {
    const [school, setSchool] = useState("");
    const [degree, setDegree] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        onSubmit({
            school,
            degree,
            startDate,
            endDate,
            description,
        });
        onClose();
    };

    return (
        <form>
            <DialogTitle>Add listItem</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Ecole"
                    fullWidth
                    value={school}
                    onChange={(event) => setSchool(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Diplome"
                    fullWidth
                    value={degree}
                    onChange={(event) => setDegree(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Date de début"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Date de fin"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
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
}

const ListItemElement = ({ listItems }) => {
    return (
        <List sx={{ width: "100%", bgcolor: "background.default" }}>
            {listItems.map((listItem, index) => (
                <ListItem
                    key={index}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "start",
                        margin: "auto",
                    }}
                >
                    <Typography variant="h6">{listItem.company}</Typography>
                    <Typography variant="body1" color={"text.secondary"}>
                        <strong>{listItem.position}</strong>
                    </Typography>
                    <Typography variant="body1" color={"text.secondary"}>
                        {listItem.startDate} - {listItem.endDate}
                    </Typography>
                    <Typography variant="body1" color={"text.secondary"}>
                        {listItem.description}
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
};

const ListForm = ({ listItems, setListItems, label, type }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (listItem) => {
        setListItems([...listItems, listItem]);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
            }}
        >
            <Box>
                <Typography variant="h6">Mes {label.split(" ")[1]}s</Typography>
                {listItems.length === 0 && (
                    <Typography variant="body1" color={"text.secondary"}>
                        Vous n'avez pas encore renseigné de{" "}
                        {label.split(" ")[1]}
                    </Typography>
                )}

                <ListItemElement listItems={listItems} />
                <ButtonForm
                    size="small"
                    content={"+ Ajouter " + label}
                    onClick={handleOpen}
                    variant="outlined"
                />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                {type === "experience" && (
                    <ListItemExperience
                        onClose={handleClose}
                        onSubmit={handleAdd}
                    />
                )}
                {type === "diplome" && (
                    <ListItemDiplome
                        onClose={handleClose}
                        onSubmit={handleAdd}
                    />
                )}
            </Dialog>
        </Box>
    );
};

export default ListForm;
