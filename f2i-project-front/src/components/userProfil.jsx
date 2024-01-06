import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const BackLink = styled(Link)`
  color: #0275d8;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
`;

const ProfileImageSection = styled.section`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const Form = styled.form`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin-top: 1rem;
  background-color: #4CAF50 !important;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #025aa5;
  }
`;

const SaveButton = styled(Button)`
  background-color: #5cb85c;
  margin-top: 2rem;
  &:hover {
    background-color: #4cae4c;
  }
`;

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    homeAddress: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission
  };

  return (
    <Wrapper>
      <Header>
        <BackLink to="/home">Retour</BackLink>
        <Title>Mon Profil</Title>
      </Header>
      <ProfileContainer>
        <ProfileImageSection>
          {userInfo.profileImage ? (
            <Avatar
              src={userInfo.profileImage}
              alt="ThéTipTop user profile"
              sx={{ width: 120, height: 120 }}
            />
          ) : (
            <Avatar sx={{ width: 120, height: 120 }}>
              <AccountCircleIcon />
            </Avatar>
          )}
          {/* <Button>Télécharger</Button>
          <Button>Supprimer</Button> */}
        </ProfileImageSection>
        <Form onSubmit={handleSubmit}>
          <ProfileDetails>
            <FormGroup>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={userInfo.username}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dateOfBirth">Date de Naissance</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={userInfo.dateOfBirth}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phoneNumber">Numéro de Téléphone</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="homeAddress">Adresse</Label>
              <Input
                id="homeAddress"
                name="homeAddress"
                type="text"
                value={userInfo.homeAddress}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={userInfo.city}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="state">État/Région</Label>
              <Input
                id="state"
                name="state"
                type="text"
                value={userInfo.state}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="zip">Code Postal</Label>
              <Input
                id="zip"
                name="zip"
                type="text"
                value={userInfo.zip}
                onChange={handleInputChange}
              />
            </FormGroup>
          </ProfileDetails>
          <SaveButton type="submit">Enregistrer</SaveButton>
        </Form>
      </ProfileContainer>
    </Wrapper>
  );
};

export default Profile;
