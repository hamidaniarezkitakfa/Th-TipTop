import { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { logUser} from '../../api/auth';
import { accountService } from '../../services/account.service';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../../services/authContex';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setToken, handleAuthChange} = useAuth();

  useEffect(() => {
    if (accountService.isLogged()) {
      router.push('/admin');
    }
}, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prevState => ({ ...prevState, [name]: value }));
  };
  const handleClick = async(e) => {
    e.preventDefault();
    try {
      const res = await logUser(loginForm);
      if (res.ok) {
          const token = await res.text();
          const decoded = jwt_decode(token);
          accountService.saveToken(token);
          await setToken(token);
          handleAuthChange(true);
          if (decoded && (decoded.isAdmin || decoded.isWorker) ) {
            toast.success("Connexion réussite");
            router.push('/admin');
          } else {
            toast.error("Erreur de Connexion, Vous étes pas autorisé a connecter")
            router.push('/admin/login');
            localStorage.clear();
          }
      } else {
        toast.error("Une Erreur est servenue verifier vos coordoner")
          
      }
  } catch (error) {
      
  } finally {
      
  }
    
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Address Email"  value={loginForm.email}
          onChange={handleChange} />

        <TextField
          name="password"
          label="Mot de Passe"
          value={loginForm.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
        mot de passe oublies?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
         Connexion
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">ThéTipTop</Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OU
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
