import axios from "axios"

export const getSupplierDetail = async (id) => {
  const token = localStorage.getItem('token')

  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/supplier/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}