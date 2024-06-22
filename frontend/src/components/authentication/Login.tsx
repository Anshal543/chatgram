import React, { useState } from 'react';
import {  TextField, Stack, IconButton, InputAdornment, Box, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password
    }
    const login  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, data)
    if(login){
      console.log("User logged in successfully",login.data)
      navigate('/chat')
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
      {/* <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography> */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
       
          <TextField
            fullWidth
            label="Email address"
            id="email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            autoComplete="off"
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
