import axios from "axios"

const BASE_URL = "https://fundoonotes.incubation.bridgelabz.com/api/user"

// Add request interceptor to handle errors globally
axios.interceptors.request.use(
  (config) => {
    // Add any necessary headers
    config.headers["Content-Type"] = "application/json"
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    })
    return Promise.reject(error)
  },
)

const token = localStorage.getItem("token")

const headerConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

export const signInAPI = (userData) => {
  return axios.post(`${BASE_URL}/login`, userData)
}

export const getAllData = () => {
  return axios.get(`${BASE_URL}/notes`, headerConfig)
}

export const signUpAPI = async (userData) => {
  try {
    
    console.log("Signup Request Payload:", userData)

    
    const requestData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      service: "advance", 
    }

    const response = await axios.post(`${BASE_URL}/userSignUp`, requestData)
    return response.data
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || "Signup failed")
    } else if (error.request) {
      // Request made but no response
      throw new Error("No response from server")
    } else {
      // Request setup error
      throw new Error("Error setting up request")
    }
  }
}