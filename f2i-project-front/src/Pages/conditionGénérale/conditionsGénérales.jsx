import React from 'react';
import styled from '@emotion/styled';

const TermsContainer = styled.div`
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


const TermsPage = () => {
  return (
    <TermsContainer>
      <Header>Conditions Générales de Vente et d'Utilisation</Header>
      
      <SubHeader>Accord entre l'utilisateur et ThéTipTop</SubHeader>
      <Paragraph>
        Bienvenue sur <a href="https://dsp-archiwebo22b-ah-em-ii-oe.dspthetiptop.fr">https://dsp-archiwebo22b-ah-em-ii-oe.dspthetiptop.fr</a>. Le site web est composé de différentes pages web exploitées par théTipTop, LLC. L'utilisation du site est conditionnée à votre acceptation des termes et conditions.
      </Paragraph>

      <SubHeader>Confidentialité</SubHeader>
      <Paragraph>
        Votre utilisation du site est soumise à la Politique de confidentialité de théTipTop.
      </Paragraph>

      <SubHeader>Communications électroniques</SubHeader>
      <Paragraph>
        La visite du site ou l'envoi de courriels à théTipTop constitue des communications électroniques.
      </Paragraph>

      <SubHeader>Utilisation du site</SubHeader>
      <Paragraph>
        Le site ThéTipTop est destiné à la promotion et la vente de thés de qualité. Toute utilisation du site à des fins illégales ou non autorisées est strictement interdite.
      </Paragraph>

      <SubHeader>Responsabilités de l'utilisateur</SubHeader>
      <Paragraph>
        En tant qu'utilisateur, vous vous engagez à ne pas utiliser le site pour des activités illicites et à respecter toutes les lois et réglementations en vigueur.
      </Paragraph>

      <SubHeader>Propriété intellectuelle</SubHeader>
      <Paragraph>
        Tous les contenus du site, y compris les textes, graphiques, logos, et images, sont la propriété de ThéTipTop et sont protégés par les lois sur la propriété intellectuelle.
      </Paragraph>

      <SubHeader>Modification des services et des prix</SubHeader>
      <Paragraph>
        ThéTipTop se réserve le droit de modifier ou d'interrompre le service sans préavis à tout moment, ainsi que de modifier les prix de ses produits.
      </Paragraph>

      <SubHeader>Produits ou services</SubHeader>
      <Paragraph>
        Certains produits ou services peuvent être disponibles exclusivement en ligne sur le site. Ces produits ou services peuvent avoir des quantités limitées et sont sujets à retour ou échange uniquement selon notre politique de retour.
      </Paragraph>

      <SubHeader>Erreurs, inexactitudes et omissions</SubHeader>
      <Paragraph>
        Il peut arriver que notre site contienne des erreurs typographiques, des inexactitudes ou des omissions qui peuvent concerner les descriptions de produits, les prix, les promotions, les offres, les frais d'expédition des produits, les délais de transit et la disponibilité.
      </Paragraph>

      <Paragraph>
        théTipTop SARL<br/>
        123 Rue de la Paix<br/>
        75000 Paris, France<br/>
        Email: contact@tiptop.com<br/>
        Téléphone: 01-23-45-67-89
      </Paragraph>
    </TermsContainer>
  );
};

export default TermsPage;
