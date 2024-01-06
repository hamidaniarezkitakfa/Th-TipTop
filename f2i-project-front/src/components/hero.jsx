import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const HeroContainer = styled.div`
    width: 100%;
    text-align: center;
    background-color: #CCC13A;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
`;

const HeroText = styled.h1`
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 20px; 
    font-family: 'Quicksand', sans-serif; 
    font-weight: 500; 

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const StyledLink = styled(Link)`
    color: #000000; 
    text-decoration: underline;
    margin-left: 5px;
&&{
    font-size: 20px; 
    font-family: 'Quicksand', sans-serif; 
    font-weight: bold; 
}
    &:hover {
        text-decoration: underline; 
    }
`;

const HeroSection = () => {
    return (
        <HeroContainer>
            <HeroText>
                Bienvenue à notre jeu concours, cliquer ici pour <StyledLink to="/participer"> participer</StyledLink>.
            </HeroText>
        </HeroContainer>
    );
}

export default HeroSection;
