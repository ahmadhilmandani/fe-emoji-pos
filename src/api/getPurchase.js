import axios from "axios"

export const getPurchase = async (payload = '') => {
  const token = localStorage.getItem('token')

  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/purchase?${payload}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}