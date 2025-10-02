import axios from "axios"

export const getIngredientDetail = async (id) => {
  const token = localStorage.getItem('token')

  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/ingredients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}