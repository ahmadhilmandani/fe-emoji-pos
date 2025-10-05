import axios from "axios"

export const updateStore = async (payload) => {
  const token = localStorage.getItem('token')

  return axios.put(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/store`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}