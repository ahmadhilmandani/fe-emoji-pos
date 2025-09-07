import axios from "axios"

export const postEmployee = async (payload) => {
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/auth/add-employee`,
    payload
  )
}