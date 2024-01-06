import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { AppBar, Toolbar, Button, Typography, IconButton, Menu, MenuItem, InputBase, Paper, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { accountService } from '../services/account.service';
import { useAuth } from '../services/authContex';
import logo from '../assets/logo1.png';
import { toast } from 'react-toastify';

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #2A5738;
  }
`;

const LogoAndTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img`
  height: 40px; // Hauteur du logo, à ajuster selon vos besoins
  width: 50px; // Largeur automatique pour maintenir le ratio de l'image
  margin-top: 2px; // Espace au-dessus du logo
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

const StyledButton = styled(Button)`
  color: white;
  &:hover {
    color: #CCC13A;
  }
  && {
    font-size: 14px;
    font-family: 'Quicksand', sans-serif;
  }
  @media (max-width: 768px) {
    display: none;
  }
  .nav-link {
    text-decoration: none;
    color: inherit;
    &.active {
      font-weight: bold;
      border-bottom: 2px solid #CCC13A;
    }
  }
`;

const MenuButton = styled(IconButton)`
  color: white;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: white;
  border-radius: 25px;
  margin-right: 10px;
`;

const SearchInput = styled(InputBase)`
  flex: 1;
  margin-left: 5px;
`;

const StyledTypography = styled(Typography)`
&& {
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
}
`;

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isAuthenticated, handleAuthChange } = useAuth();
  useEffect(() => {
    const handleResize = () => {
      const zoomLevel = window.innerWidth / window.outerWidth;
      const newIsMobile = zoomLevel < 0.7 || window.innerWidth <= 768;
      setIsMobile(newIsMobile);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isAuthenticated]);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    accountService.logout();
    handleAuthChange(false);
    handleProfileMenuClose();
    toast.success("Déconnexion réussie.");
    navigate('/home');
  };


  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoAndTitleContainer>
          <Link to="/home" >
            <StyledTypography variant="h6" component="h1">THÉ TIP TOP</StyledTypography>
            <Logo src={logo} alt="ThéTipTop Logo" />
          </Link>
        </LogoAndTitleContainer>
        <NavContainer>
          <SearchContainer>
            <SearchIcon />
            <SearchInput placeholder="Rechercher" />
          </SearchContainer>
          {isMobile ? (
            <MenuButton edge="end" aria-label="menu" aria-haspopup="true" onClick={handleMobileMenuOpen}>
              <MenuIcon style={{ color: 'white' }} />
            </MenuButton>
          ) : (
            <div className="nav-container">
              <StyledButton color="inherit"><NavLink
                to="/home"
                className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
              >Accueil</NavLink></StyledButton>
              <StyledButton color="inherit"><NavLink
                to="/about"
                className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
              >L'entreprise</NavLink></StyledButton>
              <StyledButton color="inherit"><NavLink to="/blog" 
              className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
              >Blog</NavLink></StyledButton>
              <StyledButton color="inherit"><NavLink to="/participer" 
              className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
              >Participer</NavLink></StyledButton>
              <StyledButton color="inherit"><NavLink to="/contact" 
              className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
              > Contact </NavLink></StyledButton>
              {isAuthenticated ? (
                <>
                  <StyledButton color="inherit">
                    <Avatar onClick={handleProfileMenuOpen} style={{ cursor: 'pointer' }} />
                    <Menu anchorEl={profileMenuAnchorEl} open={Boolean(profileMenuAnchorEl)} onClose={handleProfileMenuClose}>
                      <MenuItem component={Link} to="/user" onClick={handleProfileMenuClose}>Mon profil</MenuItem>
                      <MenuItem component={Link} to="/gain" onClick={handleProfileMenuClose}>Mes gains</MenuItem>
                      <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                    </Menu>
                  </StyledButton>
                </>
              ) : (
                <StyledButton color="inherit"><NavLink to="/signup" 
                className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}
                > Connexion </NavLink></StyledButton>
              )}
            </div>
          )}
          <Menu anchorEl={mobileMenuAnchorEl} open={Boolean(mobileMenuAnchorEl)} onClose={handleMobileMenuClose}>
            <MenuItem component={NavLink} to="/home" onClick={handleMobileMenuClose}>Accueil</MenuItem>
            <MenuItem component={NavLink} to="/about" onClick={handleMobileMenuClose}>L'entreprise</MenuItem>
            <MenuItem component={NavLink} to="/blog" onClick={handleMobileMenuClose}>Blog</MenuItem>
            <MenuItem component={NavLink} to="/participer" onClick={handleMobileMenuClose}>Participer</MenuItem>
            <MenuItem component={NavLink} to="/contact" onClick={handleMobileMenuClose}>Contact</MenuItem>
            {isAuthenticated && (
              <>
                <MenuItem component={NavLink} to="/user" onClick={handleMobileMenuClose}>Mon profil</MenuItem>
                <MenuItem component={NavLink} to="/gain" onClick={handleMobileMenuClose}>Mes gains</MenuItem>
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
              </>
            )}
          </Menu>
        </NavContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Navbar;
