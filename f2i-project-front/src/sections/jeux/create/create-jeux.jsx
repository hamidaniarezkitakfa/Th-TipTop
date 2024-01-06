import React, { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { createJeux } from "../../../api/admin";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [jeuxData, setJeuxData] = useState({
    nomJeux: "",
    dateDebut: "",
    dateFin: "",
    nombreDeTicketTotal: 0,
    description: "",
    grandLots: "",
    jeuxDetails: [
      { nomPrix: "", typePrix: "", valeurPrix: "", nombreTicket: 0 },
    ],
  });
  const token = localStorage.getItem("token");
  const handleJeuxChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "nombreDeTicketTotal" || name === "grandLots"
        ? Number(value)
        : value;
    setJeuxData({ ...jeuxData, [name]: updatedValue });
  };

  const handleDetailChange = (index, name, value) => {
    const updatedValue =
      name === "valeurPrix" || name === "nombreTicket" ? Number(value) : value;
    const updatedJeuxDetails = jeuxData.jeuxDetails.map(
      (detail, detailIndex) => {
        if (detailIndex === index) {
          return { ...detail, [name]: updatedValue };
        }
        return detail;
      }
    );
    setJeuxData({ ...jeuxData, jeuxDetails: updatedJeuxDetails });
  };

  const addJeuxDetail = () => {
    setJeuxData({
      ...jeuxData,
      jeuxDetails: [
        ...jeuxData.jeuxDetails,
        { nomPrix: "", typePrix: "", valeurPrix: "", nombreTicket: 0 },
      ],
    });
  };

  const removeJeuxDetail = (index) => {
    const newDetails = jeuxData.jeuxDetails.filter((_, i) => i !== index);
    setJeuxData({ ...jeuxData, jeuxDetails: newDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJeux(jeuxData, token);
      if (response.status === 201) {
        toast.success("Jeux crée avec success");
        setJeuxData({
          nomJeux: "",
          dateDebut: "",
          dateFin: "",
          nombreDeTicketTotal: 0,
          description: "",
          grandLots: "",
          jeuxDetails: [
            { nomPrix: "", typePrix: "", valeurPrix: "", nombreTicket: 0 },
          ],
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données: ", error);
      toast.error("Erreur dans la creation");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box className="css-1p24318">
        <Stack className="css-u4p24i">
          <Box className="css-i9gxme">
            <Typography variant="h4" gutterBottom className="css-1bhrkuh">
              Créer un nouveau Jeux de concours
            </Typography>
            <Breadcrumbs className="css-qz81im">
              {/* Breadcrumbs here */}
            </Breadcrumbs>
          </Box>
        </Stack>
      </Box>
      <form onSubmit={handleSubmit}>
        <Paper style={{ padding: "16px", margin: "16px 0" }}>
          <Grid container spacing={2}>
            {/* Main Jeux fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nom Jeux"
                name="nomJeux"
                fullWidth
                value={jeuxData.nomJeux}
                onChange={handleJeuxChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre De Ticket Total"
                name="nombreDeTicketTotal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={jeuxData.nombreDeTicketTotal}
                onChange={handleJeuxChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date Debut"
                name="dateDebut"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={jeuxData.dateDebut}
                onChange={handleJeuxChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date Fin"
                name="dateFin"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={jeuxData.dateFin}
                onChange={handleJeuxChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="description"
                name="description"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={jeuxData.description}
                onChange={handleJeuxChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="grand Lots"
                name="grandLots"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={jeuxData.grandLots}
                onChange={handleJeuxChange}
                variant="outlined"
              />
            </Grid>
            {/* Other fields like dateFin, nombreDeTicketTotal, and description */}
          </Grid>
        </Paper>

        <Paper style={{ padding: "16px", margin: "16px 0" }}>
          <Grid container spacing={2}>
            {jeuxData.jeuxDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Nom Prix"
                    name="nomPrix"
                    fullWidth
                    value={detail.nomPrix}
                    onChange={(e) =>
                      handleDetailChange(index, "nomPrix", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Type Prix"
                    name="typePrix"
                    fullWidth
                    value={detail.typePrix}
                    onChange={(e) =>
                      handleDetailChange(index, "typePrix", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="valeur Prix"
                    name="valeurPrix"
                    fullWidth
                    value={detail.valeurPrix}
                    onChange={(e) =>
                      handleDetailChange(index, "valeurPrix", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="nombre Ticket"
                    name="nombreTicket"
                    fullWidth
                    value={detail.nombreTicket}
                    onChange={(e) =>
                      handleDetailChange(index, "nombreTicket", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <IconButton onClick={() => removeJeuxDetail(index)}>
                    <RemoveCircleIcon />
                  </IconButton>
                </Grid>
                <br />
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                startIcon={<AddCircleIcon />}
                onClick={addJeuxDetail}
                color="inherit"
              >
                Ajouter Jeux Detail
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Button type="submit" variant="contained" color="inherit">
          Créer Jeux
        </Button>
      </form>
    </Container>
  );
};

export default CreateUser;
