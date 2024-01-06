import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logUser, createUser } from '../../api/auth';
import { accountService } from '../../services/account.service';
import { useAuth } from '../../services/authContex';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { getUser } from '../../api/authGoogle';


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const FormContainer = styled.div`
background-color: #f5f5f5;
padding: 40px;
border-radius: 8px;
box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
width: 80%; 
position: relative; 

@media (max-width: 768px) {
  flex-direction: column;
  padding: 20px;
  width: 90%;
}

@media (max-width: 480px) {
  width: 100%;
  padding: 10px;
}

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const VerticalLine = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
height: 90%;
width: 2px;
background-color: green;

@media (max-width: 768px) {
  display: none;
}
`;

const ValidButton = styled.button`
padding: 10px 20px;
border: none;
border-radius: 4px;
background-color: #4CAF50 !important;
color: white;
cursor: pointer;
font-family: 'Quicksand', sans-serif;
font-weight: bold;

&:hover {
  background-color: #45a049 !important;
}

@media (max-width: 768px) {
  padding: 15px 30px;
}
`;

const Input = styled.input`
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
width: 110%;

@media (max-width: 768px) {
  width: calc(100% - 20px); // Account for padding
}

@media (max-width: 480px) {
  width: calc(100% - 10px); // Account for smaller padding
}
`;

const SocialButton = styled(Button)`
padding: 10px 20px;
border-radius: 4px;
cursor: pointer;
display: flex;
align-items: center;
gap: 10px;
p{
font-family: 'Quicksand', sans-serif;
font-weight: bold;
}

@media (max-width: 768px) {
  justify-content: center;
  width: 100%;
  margin-top: 10px;
}
`;
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CheckboxInput = styled.input`
  margin-bottom: 4px; // Ajustez l'espacement au besoin
`;

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 8px; 
  font-family: 'Quicksand', sans-serif;
font-weight: bold;
`;

const LinkText = styled(Link)`
  color: blue;
  text-decoration: underline;
  font-family: 'Quicksand', sans-serif;
font-weight: bold;

  &:hover {
    text-decoration: none;
  }
`;

const Title = styled.h3`
font-family: 'Quicksand', sans-serif;
font-weight: bold;
font-size: 18px;
`;

const SignupLogin = () => {
    const navigate = useNavigate();
    const { setToken, handleAuthChange } = useAuth();
    const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);

    // États pour les formulaires d'inscription et de connexion
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '', termsAccepted: false });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



    // Effet pour rediriger si l'utilisateur est déjà connecté
    useEffect(() => {
        if (accountService.isLogged()) {
            navigate('/home');
        }
    }, [navigate]);

    // Gestion des changements de champs de formulaire
    const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    const handleSignupChange = (e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

    // Gestion du changement de la case à cocher
    const handleCheckboxChange = (e) => setSignupForm({ ...signupForm, termsAccepted: e.target.checked });

    // Soumission du formulaire de connexion
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!loginForm.email.trim() || !loginForm.password.trim()) {
            toast.error('Veuillez remplir tous les champs.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            const res = await logUser(loginForm);
            console.log(res);
            if (res.status === 201) {
                const token = await res.text();
                accountService.saveToken(token);
                setToken(token);
                handleAuthChange(true);
                toast.success("Connexion réussie.");
                navigate('/home');
            } else {
                toast.error('Email ou mot de passe incorrect.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Une erreur est survenue lors de la connexion.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Soumission du formulaire d'inscription
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validation du nom d'utilisateur
        if (!signupForm.username.trim()) {
            toast.error('Le nom d\'utilisateur est requis');
            isValid = false;
            return;
        } else if (!/[a-zA-Z]/.test(signupForm.username)) {
            toast.error('Le nom d\'utilisateur doit contenir au moins une lettre');
            isValid = false;
            return;
        }
        // Validation de l'email
        if (!signupForm.email.trim()) {
            toast.error('L\'email est requis');
            isValid = false;
            return;
        } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
            toast.error('L\'email n\'est pas valide');
            isValid = false;
            return;
        }
        // Validation du mot de passe
        if (!signupForm.password) {
            toast.error('Le mot de passe est requis');
            isValid = false;
            return;
        }

        if (!passwordRegex.test(signupForm.password)) {
            toast.error('Le mot de passe ne répond pas aux exigences.');
            isValid = false;
            return;
        }

        if (!signupForm.termsAccepted) {
            toast.error('Vous devez accepter les Conditions Générales.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        if (isValid) {
            try {
                const res = await createUser(signupForm);
                if (res.status === 201) {
                    toast.success("Compte créé avec succès !");
                    setError('');
                    navigate('/signup');
                    setSignupForm({ username: '', email: '', password: '', termsAccepted: false });
                } else {
                    const data = await res.json();
                    toast.error(data.message || 'Erreur lors de la création du compte.');
                }
            } catch (error) {
                console.error(error);
                toast.error('Une erreur est survenue lors de la création du compte.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);

        }
    };

 
        const handleGoogleLogin = async () => {
            if (isGoogleAuthenticated) {
                try {
                    const jwt = await getUser();
                    setIsGoogleAuthenticated(false); // Réinitialiser après avoir récupéré le JWT
                } catch (error) {
                    console.error('Erreur lors de la récupération du JWT', error);
                }
            } else {
                // Redirection pour le premier clic
                window.location.href = 'http://localhost:3001/api/users/google';
                navigate('/signup');

                setIsGoogleAuthenticated(true); // Supposer que l'utilisateur s'est authentifié avec succès
            }
    };

    const handleFacebookLogin = () => {
        // Implementation of Facebook login logic
    };

    return (
        <PageContainer>
            <FormContainer>
                <Form onSubmit={handleSignupSubmit}>
                    <Title>Inscription</Title>
                    <Input type="text" placeholder="Nom D'utilisateur" name="username" value={signupForm.username} onChange={handleSignupChange} />
                    <Input type="email" placeholder="Email" name="email" value={signupForm.email} onChange={handleSignupChange} />
                    <Tooltip title="Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et un caractère spécial @,#,=,+,&.......">
                        <Input type="password" placeholder="Mot de passe" name="password" value={signupForm.password} onChange={handleSignupChange} />
                    </Tooltip>
                    <CheckboxContainer>
                        <Label>
                            <CheckboxInput
                                 type="checkbox"
                                checked={signupForm.termsAccepted}
                                onChange={handleCheckboxChange}
                            />
                            <Text>J'accepte les</Text>
                            <LinkText to="/conditionGénerale">Conditions Générales</LinkText>
                        </Label>
                        <Text>et la <LinkText to="/politiqueDeConfidentialité">politique de confidentialité</LinkText>.</Text>
                    </CheckboxContainer>
                    <ValidButton type="submit" disabled={isSubmitting}>{isSubmitting ? 'Inscription en cours...' : 'Créer un compte'}</ValidButton>
                    <SocialButton startIcon={<GoogleIcon />} onClick={handleGoogleLogin} style={{ backgroundColor: '#4285F4', color: 'white' }}>
                        <p>S'inscrire avec Google</p>
                    </SocialButton>
                    <SocialButton startIcon={<FacebookIcon />} onClick={() => {/* logique de connexion Facebook */ }} style={{ backgroundColor: '#1877F2', color: 'white' }}>
                    <p> S'inscrire avec Facebook </p>
                    </SocialButton>
                </Form>
                <VerticalLine />
                <Form onSubmit={handleLoginSubmit}>
                    <Title>Connexion</Title>
                    <Input type="email" placeholder="Email" name="email" value={loginForm.email} onChange={handleLoginChange} />
                    <Input type="password" placeholder="Mot de passe" name="password" value={loginForm.password} onChange={handleLoginChange} />
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <ValidButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Connexion en cours...' : 'Connexion'}
                    </ValidButton>
                </Form>
            </FormContainer>
        </PageContainer>
    );
};

export default SignupLogin;