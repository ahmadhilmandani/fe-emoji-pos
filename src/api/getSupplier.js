import axios from "axios"

export const getSupplier = async () => {
  const token = localStorage.getItem('token')
  
  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/supplier`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}