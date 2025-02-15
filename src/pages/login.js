

import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Link, Button } from "@mui/material";
import "./login.css";

const Login = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
    const passwordRegex = /^.{8,}$/; // At least 8 characters

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = "Email or phone is required";
    } else if (!emailRegex.test(formData.emailOrPhone) && !phoneRegex.test(formData.emailOrPhone)) {
      newErrors.emailOrPhone = "Enter a valid email or 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login successful:", formData);
      alert("Login Successful! 🎉");
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
          label="Email or phone"
          name="emailOrPhone"
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={formData.emailOrPhone}
          onChange={handleChange}
          error={!!errors.emailOrPhone}
          helperText={errors.emailOrPhone}
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

        <Link href="#" sx={{ display: "block", textAlign: "left", mb: 2 }}>
          Forgot Password?
        </Link>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Link href="#">Create Account</Link>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;





