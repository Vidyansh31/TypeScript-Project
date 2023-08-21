import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../Context/authContext";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if(auth.isLoggedIn()){
      navigate("/home");
      return;
    }
  }, [auth.isLoggedIn()])
  

  const handleSubmit = (e: React.FormEvent) => {
    // Save user details to localStorage
    e.preventDefault();
    auth.Login(name, email, phone);
    navigate("/home");
    return;
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <CssBaseline />
      <Box className="formBox">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
