import axios from "axios"

export const getProduct = async (payload) => {
  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/product`,
    payload
  )
}