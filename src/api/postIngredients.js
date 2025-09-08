import axios from "axios"

export const postIngredients = async (payload) => {
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/ingredients`,
    payload
  )
}