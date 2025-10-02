import axios from "axios"

export const updateIngredients = async (id, payload) => {
  const token = localStorage.getItem('token')
  
  return axios.put(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/ingredients/${id}`,
    payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}