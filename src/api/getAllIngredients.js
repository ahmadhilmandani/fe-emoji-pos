import axios from "axios"

export const getAllIngredients = async (storeId) => {
  const token = localStorage.getItem('token')
  
  return axios.get(`${import.meta.env.VITE_DEV_API_BASE_URL}/ingredients?store_id=${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}