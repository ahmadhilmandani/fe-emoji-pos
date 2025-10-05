import axios from "axios"

export const getStore = async () => {
  const token = localStorage.getItem('token')

  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/store`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}