import React from 'react';
import styled from '@emotion/styled';

const PrivacyPolicyContainer = styled.div`
  padding: 20px;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 15px;
    font-size: 15px;
  }

  @media (min-width: 1025px) {
    padding: 20px;
    font-size: 16px;
    height: 200vh;
  }
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2em;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const SubHeader = styled.h2`
  margin-top: 20px;
  font-size: 1em;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const Paragraph = styled.p`
  margin-top: 10px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const PrivacyPolicyPage = () => {
  return (
    <PrivacyPolicyContainer>
      <Header>Politique de Confidentialité</Header>
      
      <SubHeader>Introduction</SubHeader>
      <Paragraph>
        Chez ThéTipTop, nous nous engageons à protéger la confidentialité et la sécurité des informations personnelles de nos clients. Cette politique explique comment nous collectons, utilisons et partageons vos données personnelles.
      </Paragraph>

      <SubHeader>Collecte de données</SubHeader>
      <Paragraph>
        Nous collectons des informations personnelles lorsque vous utilisez notre site, passez une commande, vous inscrivez à notre newsletter, ou communiquez avec nous. Ces informations peuvent inclure votre nom, adresse, adresse e-mail, numéro de téléphone et détails de paiement.
      </Paragraph>

      <SubHeader>Utilisation des données</SubHeader>
      <Paragraph>
        Vos données sont utilisées pour gérer vos commandes, améliorer votre expérience sur notre site, communiquer avec vous et, si vous y avez consenti, vous envoyer des informations marketing.
      </Paragraph>

      <SubHeader>Partage des données</SubHeader>
      <Paragraph>
        Nous ne vendons pas vos données personnelles à des tiers. Vos données peuvent être partagées avec des partenaires de service qui nous aident à exécuter nos services, comme la livraison de commandes et le traitement des paiements.
      </Paragraph>

      <SubHeader>Sécurité des données</SubHeader>
      <Paragraph>
        Nous prenons des mesures strictes pour protéger vos données personnelles contre l'accès non autorisé, l'utilisation inappropriée ou la divulgation.
      </Paragraph>

      <SubHeader>Vos droits</SubHeader>
      <Paragraph>
        Vous avez le droit de demander l'accès à vos données personnelles, de les rectifier, de demander leur suppression ou de restreindre leur traitement. Vous pouvez également vous opposer à l'utilisation de vos données à des fins de marketing.
      </Paragraph>

      <SubHeader>Modifications de la politique</SubHeader>
      <Paragraph>
        Nous pouvons mettre à jour cette politique de temps à autre. Les modifications seront publiées sur cette page avec une indication de la date de la dernière mise à jour.
      </Paragraph>

      <SubHeader>Contact</SubHeader>
      <Paragraph>
        Si vous avez des questions sur cette politique ou sur la manière dont nous utilisons vos données, veuillez nous contacter à contact@tiptop.com.
      </Paragraph>

    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicyPage;
