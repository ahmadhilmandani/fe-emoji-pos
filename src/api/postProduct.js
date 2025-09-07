import axios from "axios"

export const postProduct = async (payload) => {
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/product`,
    payload
  )
}