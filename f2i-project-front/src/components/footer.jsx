import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import facebookIcon from '../assets/facebook.png'; 
import instagramIcon from '../assets/instagram.png'; 
import linkedInIcon from '../assets/linkedin.png'; 
import twitterIcon from '../assets/twitter.png'; 
import logo from '../assets/logo1.png'


const FooterContainer = styled.footer`
  background-color: #2A5738;
  color: white;
  padding: 10px 0;
`;

const FooterTop = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
width: 100%;
padding: 0 20px;
`;

const BrandName = styled.h2`
  margin: 0;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  font-size: 18px;
  
`;

const Logo = styled.img`
  height: 40px;
  margin-top: 4px;
`;

const Nav = styled.nav`
  display: flex;
  margin-right: 20px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-right: 50px;
`;

const SocialIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-left: 15px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CopyrightText = styled.p`
  margin-left: 30%;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  font-size: 14px;
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const FooterComponent = () => (
  <FooterContainer>
    <FooterTop>
      <div>
        <Link to="/home" onClick={scrollToTop}>
          <BrandName>THÉ TIP TOP</BrandName>
          <Logo src={logo} alt="ThéTipTop Logo" />
        </Link>
      </div>
      <Nav>
        <NavItem to="/montionlégales" onClick={scrollToTop}>Mentions légales</NavItem>
        <NavItem to="/conditionGénerale" onClick={scrollToTop}>Conditions générales (CGVU)</NavItem>
        <NavItem to="/politiqueDeConfidentialité" onClick={scrollToTop}>Politique de confidentialité</NavItem>
        <NavItem to="/contact" onClick={scrollToTop}>Contact</NavItem>
      </Nav>
    </FooterTop>
    <FooterBottom>
      <CopyrightText>© 2023 Thé Tip Top. Powered by Thé Tip Top</CopyrightText>
      <SocialMediaIcons>
        <a href="https://www.instagram.com/thetiptoptea/" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={instagramIcon} alt="ThéTipTop Instagram" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61554462031771" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={facebookIcon} alt="ThéTipTop Facebook" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={linkedInIcon} alt="ThéTipTop LinkedIn" />
        </a>
        <a href="https://twitter.com/thethetiptop" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={twitterIcon} alt="ThéTipTop Twitter" />
        </a>
      </SocialMediaIcons>
    </FooterBottom>
  </FooterContainer>
);

export default FooterComponent;
