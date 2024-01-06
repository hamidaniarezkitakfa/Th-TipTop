import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const GameRulesDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        {"Règles du jeu de ThéTipTop"}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bienvenue au jeu-concours de ThéTipTop! Voici les détails des gains et les informations importantes :
          <ul>
            <li>Participation possible avec un ticket de caisse ou une facture de plus de 49€.</li>
            <li>Chaque ticket possède un numéro unique à 10 chiffres pour participer.</li>
            <li>Voici les gains possibles pour les participants :
              <ul>
                <li>Un infuseur à thé</li>
                <li>Une boîte de 100g de thé détox ou infusion</li>
                <li>Une boîte de 100g de thé signature</li>
                <li>Un coffret découverte d’une valeur de 39€</li>
                <li>Un coffret découverte d’une valeur de 69€</li>
              </ul>
            </li>
            <li>Le jeu concours se déroule sur 30 jours.</li>
            <li>Les gains peuvent être réclamés en magasin ou en ligne dans les 60 jours depuis la date debut du jeu.</li>
            <li>Un tirage au sort final pour gagner un an de thé d’une valeur de 360€.</li>
          </ul>
          Nous vous souhaitons bonne chance et espérons que vous apprécierez nos thés de qualité!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameRulesDialog;
