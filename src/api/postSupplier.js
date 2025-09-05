import axios from "axios"

export const postSupplier = async (payload) => {
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/supplier`,
    payload
  )
}