


import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Link,
  Button,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@mui/material"
import { signUpAPI } from "../services/userServices"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import "./signup.css"

function Signup() {
  const navigate = useNavigate()
  const isMobile = useMediaQuery("(max-width:600px)")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword })
  }

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required"

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long & contain letters, numbers & symbols"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required"
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      service: "advance",
    }

    try {
      const response = await signUpAPI(userData)
      console.log("Signup Response:", response)

      if (response.id) {
        localStorage.setItem("userId", response.id)
        alert("Signup Successful! 🎉")
        navigate("/login")
      } else {
        alert("Signup successful, please login to continue.")
        navigate("/login")
      }
    } catch (error) {
      console.error("Signup Error:", error)
      alert(error.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="signup-container">
      <Paper elevation={3} className="signup-box">
        <Box className="signup-content">
          <Box className="signup-form">
            <Typography variant="h4" textAlign="start" color="primary" fontWeight="bold">
              Google
            </Typography>
            <Typography variant="h6" textAlign="start" mt={1} mb={2}>
              Create your Google Account
            </Typography>

            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                fullWidth
                required
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                required
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>

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
            <Typography variant="body2" color="gray">
              You can use letters, numbers & periods
            </Typography>

            <Box display="flex" gap={2} mt={2} mb={2}>
              <TextField
                label="Password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                label="Confirm"
                name="confirmPassword"
                type={formData.showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Box>

            <Typography variant="body2" color="gray" mb={1}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </Typography>

            <FormControlLabel
              control={<Checkbox checked={formData.showPassword} onChange={togglePasswordVisibility} />}
              label="Show Password"
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                <Button color="primary">Sign in instead</Button>
              </RouterLink>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Signing Up..." : "Next"}
              </Button>
            </Box>
          </Box>

          {!isMobile && (
            <Box className="signup-image">
              <img
                src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
                alt="Google Signup"
                style={{ width: "225px", height: "200px" }}
              />
              <Typography variant="body2" className="signup-image-text">
                One account. All of Google working for you
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default Signup










