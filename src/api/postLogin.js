import axios from "axios"

export const postLogin = async (payload) => {
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/auth/login`,
    payload
  )
}