import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    font-family: Arial, sans-serif;
    line-height: 1.6;
    width: 80%;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: 1024px) {
        width: 85%;
    }
    @media (min-width: 1025px) {
        width: 85%;
        height: 130vh;
      }

    @media (max-width: 768px) {
        width: 95%;
        padding: 10px;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

const Heading = styled.h1`
    color: #333;
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;

    @media (max-width: 1024px) {
        font-size: 1.8em;
    }

    @media (max-width: 768px) {
        font-size: 1.5em;
    }

    @media (max-width: 480px) {
        font-size: 1.2em;
    }
`;

const SubHeading = styled.h2`
    color: #333;
    font-size: 1em;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;

    @media (max-width: 1024px) {
        font-size: 0.95em;
        
    }

    @media (max-width: 768px) {
        font-size: 0.9em;
    }

    @media (max-width: 480px) {
        font-size: 0.8em;
    }
`;

const Paragraph = styled.p`
    margin: 10px 0;
    font-family: 'Quicksand', sans-serif;

    @media (max-width: 1024px) {
        font-size: 0.95em;
        
    }

    @media (max-width: 768px) {
        font-size: 0.9em;
    }

    @media (max-width: 480px) {
        font-size: 0.8em;
    }
`;

const LegalPage = () => {
    return (
        <Container>
            <Heading>Mentions Légales</Heading>

            <SubHeading>Informations Générales</SubHeading>
            <Paragraph><strong>Nom de la Société :</strong> ThéTipTop</Paragraph>
            <Paragraph><strong>Adresse du Siège Social :</strong> 18 rue Léon Frot, 75011 Paris</Paragraph>
            <Paragraph><strong>Forme Juridique :</strong> Société Anonyme (SA)</Paragraph>
            <Paragraph><strong>Capital Social :</strong> 150 000€</Paragraph>
            <Paragraph><strong>Gérant :</strong> Mr Eric Bourdon</Paragraph>

            <SubHeading>Description de l'Activité</SubHeading>
            <Paragraph>ThéTipTop est une société spécialisée dans la promotion de gammes de thés de très grande qualité, incluant des mélanges signatures, thés détox, thés blancs, thés légumes, infusions, etc. Tous nos thés sont bios et fabriqués de manière artisanale (Handmades).</Paragraph>

            <SubHeading>Jeu-Concours</SubHeading>
            <Paragraph>Pour célébrer l’ouverture de notre 10ème boutique à Nice et attirer l'attention de nouveaux clients, ThéTipTop organise un jeu-concours de type tirage au sort. Les clients ayant un ticket de caisse ou une facture supérieure à 49€ pourront participer grâce à un numéro à 10 chiffres trouvé sur ces derniers.</Paragraph>

            <SubHeading>Informations Légales Supplémentaires</SubHeading>
            <Paragraph><strong>Numéro d'Identification :</strong> 823 900 478 00011</Paragraph>
            <Paragraph><strong>Contact :</strong> contact@tiptop.com | 01-23-45-67-89</Paragraph>
            <Paragraph><strong>Hébergement du Site :</strong> AWS, https://dsp-archiwebo22b-ah-em-ii-oe.dspthetiptop.fr</Paragraph>

            <Paragraph>Les informations fournies dans les mentions légales sont sujettes à changement et peuvent être mises à jour régulièrement.</Paragraph>
        </Container>
    );
};

export default LegalPage;
