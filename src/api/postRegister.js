import axios from "axios"

export const postRegisterStore = async (payload) => {
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/auth/add-owner-store`,
    payload
  )
}