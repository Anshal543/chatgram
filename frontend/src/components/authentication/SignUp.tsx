import React, { useState } from 'react';
import {  TextField, Stack, IconButton, InputAdornment, Box, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password
    }
    const signup  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, data)
    if(signup){
      console.log("User created successfully",signup.data)
      // navigate('/login')
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
            label="Username"
            id="username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            
          />
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
            label="Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
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
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUp;
