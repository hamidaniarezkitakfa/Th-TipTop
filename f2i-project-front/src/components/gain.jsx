import React, { useState, useEffect} from 'react';
import styled from '@emotion/styled';
import { getWin, claimWin  } from '../api/participer';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding-top: 70px; 
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center; 

  @media (max-width: 768px) { // tablettes
    padding-top: 60px;
  }

  @media (max-width: 480px) { // mobiles
    padding-top: 50px;
  }
`;

const WinningsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 50px; 
  max-width: 800px; 
  width: 100%; 
  margin-left: auto; 
  margin-right: auto;

  @media (max-width: 768px) { // tablettes
    max-width: 500px;
  }

  @media (max-width: 480px) { // mobiles
    max-width: 100%;
    margin-top: 30px;
  }
`;

const WinningItem = styled.li`
  background-color: white;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) { // mobiles
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ClaimButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif; 
    font-weight: bold;

  @media (max-width: 480px) { // mobiles
    padding: 8px 16px;
    font-size: 14px;
  }
`;
const StyledSpan = styled.span`
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
`;
const Title = styled.h2`
  font-size: 18px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
`;

const WinningsPage = () => {
    const [winnings, setWinnings] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const getWins = async () => {

          try {
            const winsData = await getWin(token);
            if (winsData) {
                let  formattedWins = winsData.map(win => ({
                id: win.id,
                typePrix: win.jeuxDetails.typePrix,
                valeurPrix: win.jeuxDetails.valeurPrix,
                claimed: win.gains.some(gain => gain.dateDeRecuperation !== null),
                gainId: win.gains[0].id,
                dateDeRecuperation: win.gains[0].dateDeRecuperation,
                dateLimitedeRecuperation: win.gains[0].dateLimiteDeRecuperation
              }));
              formattedWins = formattedWins.sort((a, b) => {
                if (!a.claimed && !b.claimed) {
                  return 0; // Les deux gains ne sont pas réclamés, pas de changement
                } else if (!a.claimed) {
                  return -1; // Les gains non réclamés en premier
                } else if (!b.claimed) {
                  return 1; // Les gains non réclamés en premier
                } else {
                  // Trier par date de récupération si les deux gains sont réclamés
                  return new Date(b.dateDeRecuperation) - new Date(a.dateDeRecuperation);
                }
              });
              setWinnings(formattedWins);
            }
          } catch (error) {
            console.error('Erreur lors de la récupération des gains :', error);
          }
        };
    
        getWins();
      }, []);
console.log(winnings)
      const claimWinning = async (gainId) => {
        try {
          
          const result = await claimWin(gainId, token);
          const currentDate = new Date().toISOString();
          if (result) {
           
            setWinnings(winnings.map(winning => 
              winning.gainId === gainId ? { ...winning, claimed: true, dateDeRecuperation: currentDate } : winning
            ));
            toast.success("Gain réclamé avec succès !");
          }
        } catch (error) {
            toast.error("Erreur lors de la réclamation du gain.");
        }
      };
    

  return (
    <PageContainer>
      <Title>Mes Gains</Title>
      <WinningsList>
        {winnings.map(winning => (
          <WinningItem key={winning.gainId}>
            {!winning.claimed ?(
            <StyledSpan>{winning.typePrix} - {winning.valeurPrix}€ - {` (A recupérer avant ${new Date(winning.dateLimitedeRecuperation).toLocaleDateString()})`}</StyledSpan>
            ):(<StyledSpan>{winning.typePrix} - {winning.valeurPrix}€</StyledSpan>)}
            {winning.claimed ? (
              <StyledSpan>Réclamé  {` le ${new Date(winning.dateDeRecuperation).toLocaleDateString()}`}</StyledSpan>
            ) : (
              <ClaimButton onClick={() => claimWinning(winning.gainId)}>
                Réclamer
              </ClaimButton>
            )}
          </WinningItem>
        ))}
      </WinningsList>
    </PageContainer>
  );
};

export default WinningsPage;
