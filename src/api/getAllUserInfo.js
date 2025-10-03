import axios from "axios"

export const getAllUserInfo = async () => {
  return axios.get(`${import.meta.env.VITE_DEV_API_BASE_URL}/user-info`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}