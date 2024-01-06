import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StyledPaper = styled.div`
    background-color: #CCC13A;  
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* Styles for mobile devices */
    @media (max-width: 600px) {
        flex-direction: column;
        text-align: center;
    }

    /* Zoom-friendly styles */
    @media (max-resolution: 150dpi) {
        font-size: larger;
    }
`;

const InfoBox = styled.div`
    h6, p {
        color: black;  
        margin: 0;
    }

    h6 {
        font-weight: bold;
    }

    /* Styles for mobile devices */
    @media (max-width: 600px) {
        margin-bottom: 20px;
    }
`;

const CountdownBox = styled.div`
    display: flex;
    gap: 10px;

    div {
        text-align: center;

        h4 {
            color: black;  
            margin: 0;
        }

        p {
            color: black;  
            margin: 0;
        }
    }

    /* Styles for mobile devices */
    @media (max-width: 600px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const StyledTypography = styled(Typography)`
    && {
        font-size: 20px;
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
    }
`;

const StyledTypographyCondition = styled(Typography)`
    && {
        font-size: 15px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 500;
    }
`;

const StyledTypographyCountdown = styled(Typography)`
    && {
        font-size: 40px;
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
    }

    /* Styles for mobile devices */
    @media (max-width: 600px) {
        font-size: 30px;
    }

    /* Zoom-friendly styles */
    @media (max-resolution: 150dpi) {
        font-size: 50px;
    }
`;
function Countdown() {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [userInput, setUserInput] = useState(35);
    const startCountdown = () => {
        const totalDays = parseInt(userInput, 10);
        if (!isNaN(totalDays) && totalDays > 0) {
          const totalSeconds = totalDays * 24 * 60 * 60;
          setTotalSeconds(totalSeconds);
        }
      };
    
      useEffect(() => {
        if (userInput) {
          startCountdown();
        }
      }, [userInput]);
    
      useEffect(() => {
        const interval = setInterval(() => {
          if (totalSeconds > 0) {
            setTotalSeconds((prev) => prev - 1);
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }, [totalSeconds]);
    
      useEffect(() => {
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
    
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }, [totalSeconds]);

    return (
        <StyledPaper>
            <InfoBox>
                <StyledTypography variant="h6" component="h1">
                    Participer avant le 15/12/2023 pour gagner
                </StyledTypography>
                <StyledTypographyCondition variant="body2">
                    *Voir Conditions générales
                </StyledTypographyCondition>
            </InfoBox>
            <CountdownBox>
                <div>
                    <StyledTypographyCountdown variant="h4">{days}</StyledTypographyCountdown>
                    <Typography variant="body2">Jours</Typography>
                </div>
                <div>
                    <StyledTypographyCountdown variant="h4">:</StyledTypographyCountdown>
                </div>
                <div>
                    <StyledTypographyCountdown variant="h4">{hours}</StyledTypographyCountdown>
                    <Typography variant="body2">Heures</Typography>
                </div>
                <div>
                    <StyledTypographyCountdown variant="h4">:</StyledTypographyCountdown>
                </div>
                <div>
                    <StyledTypographyCountdown variant="h4">{minutes}</StyledTypographyCountdown>
                    <Typography variant="body2">Minutes</Typography>
                </div>
                <div>
                    <StyledTypographyCountdown variant="h4">:</StyledTypographyCountdown>
                </div>
                <div>
                    <StyledTypographyCountdown variant="h4">{seconds}</StyledTypographyCountdown>
                    <Typography variant="body2">Secondes</Typography>
                </div>
            </CountdownBox>
        </StyledPaper>
    );
}

export default Countdown;
