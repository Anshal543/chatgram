import React, { useState } from 'react';
import { TextField, Stack, IconButton, InputAdornment, Box, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset error state
    setError({ email: '', password: '' });

    let valid = true;

    if (!email) {
      setError(prev => ({ ...prev, email: 'Email is required' }));
      valid = false;
    }

    if (!password) {
      setError(prev => ({ ...prev, password: 'Password is required' }));
      valid = false;
    }

    if (!valid) return;

    try {
      const data = {
        email: email,
        password: password
      };

      const login = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, data);

      if (login) {
        console.log("User logged in successfully", login.data);
        // navigate('/chat');
        window.location.href = '/chat';
      }
    } catch (err) {
      console.error("Login failed", err);
      // Handle login failure (e.g., show a message to the user)
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '400px',
        mx: 'auto',
        mt: 0,
        p: 3,
        // bgcolor: 'background.paper',
        // borderRadius: 1,
        // boxShadow: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <TextField
            fullWidth
            label="Email address"
            id="email"
            type="email"
            variant="outlined"
            error={!!error.email}
            helperText={error.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            error={!!error.password}
            helperText={error.password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
