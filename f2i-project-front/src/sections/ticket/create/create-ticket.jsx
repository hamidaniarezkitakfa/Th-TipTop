import React, { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { createTicket } from "../../../api/admin";
import { toast } from "react-toastify";

const CreateTicket = () => {
  const token = localStorage.getItem("token");
  const [TicketData, setTicketData] = useState({
    numJeux: "",
  });

  const handleTiketChange = async (e) => {
    setTicketData({ ...TicketData, [e.target.name]: e.target.value });
  };

  const handleClickCreatePage = async (e) => {
    e.preventDefault();
    try {
      const response = await createTicket(token);
      if (response.status === 201) {
        toast.success("ticket crée avec success");
      }
    } catch (error) {
      console.error("Erreur lors de la création du ticket:", error);
      toast.error("Erreur lors de la création du ticket");
    }
  };

  return (
    <Container maxWidth="lg" className="css-1qsxih2">
      <Box className="css-1p24318">
        <Stack className="css-u4p24i">
          <Box className="css-i9gxme">
            <Typography variant="h4" gutterBottom className="css-1bhrkuh">
              Créer un nouveau Ticket
            </Typography>
            <Breadcrumbs className="css-qz81im">
              {/* Breadcrumbs here */}
            </Breadcrumbs>
          </Box>
        </Stack>
      </Box>

      <form onSubmit={handleClickCreatePage}>
        <Paper style={{ padding: "16px", margin: "16px 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Num Ticket"
                name="numJeux"
                fullWidth
                value={TicketData.nomJeux}
                variant="outlined"
                disabled="disabled"
                onChange={handleTiketChange}
              />
            </Grid>
          </Grid>
        </Paper>

        <Button
          type="submit"
          onClick={handleClickCreatePage}
          variant="contained"
          color="inherit"
        >
          Créer Ticket
        </Button>
      </form>
    </Container>
  );
};

export default CreateTicket;
