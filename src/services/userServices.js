import axios from "axios";
import React from "react";

// Base URL for the backend API
const BASE_URL = "https://fundoonotes.incubation.bridgelabz.com/api/user";

// Function to get the Authorization header (for protected routes)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Token-based authentication
    },
  };
};


export const signInAPI = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data; 
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error; 
  }
};


export const signUpAPI = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};
