import React from 'react';
import styled from '@emotion/styled';

const WarningContainer = styled.div`
  background-color: #ffffe0; // Couleur jaune pâle pour le fond de l'avertissement
  color: #333; // Couleur foncée pour le texte
  text-align: center; // Centrer le texte
  border-radius: 5px; // Adoucir les coins du conteneur
  font-size: 18px; // Taille de la police
  font-family: 'Quicksand', sans-serif;
    font-weight: bold;
`;

const AcademicWarning = () => (
  <WarningContainer>
    Ce projet est créé uniquement dans le cadre des études. Veuillez ne pas communiquer vos données sensibles.
  </WarningContainer>
);

export default AcademicWarning;
