import axios from "axios"

export const getAllIngredients = async () => {
  const token = localStorage.getItem('token')
  
  return axios.get(`${import.meta.env.VITE_DEV_API_BASE_URL}/ingredients`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}