import axios from "axios"

export const postSupplier = async (payload) => {
  const token = localStorage.getItem('token')
  
  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/supplier`,
    payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}