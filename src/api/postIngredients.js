import axios from "axios"

export const postIngredients = async (payload) => {
  const token = localStorage.getItem('token')
  
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/ingredients`,
    payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}