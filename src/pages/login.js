

import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { signInAPI } from "../services/userServices";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await signInAPI({
        email: formData.email,
        password: formData.password,
        service: "advance",
      });

      if (response.data && response.data.id) {
        localStorage.setItem("token", response.data.id);
        localStorage.setItem("userId", response.data.userId);
        
        alert("Login Successful! 🎉");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({
        submit: error.response?.data?.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Paper elevation={3} className="login-box">
        <Typography variant="h4" textAlign="center" color="primary" fontWeight="bold">
          Google
        </Typography>
        <Typography variant="h6" textAlign="center" mt={1} mb={2}>
          Login
        </Typography>
        <Typography textAlign="center" color="gray" fontSize={14} mb={3}>
          Use your Google Account
        </Typography>

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        {errors.submit && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Typography>
        )}

        <Button
          component={RouterLink}
          to="/forgot-password"
          color="primary"
          sx={{ display: "block", textAlign: "left", mb: 2 }}
        >
          Forgot Password?
        </Button>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button component={RouterLink} to="/signup" color="primary">
            Create Account
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;