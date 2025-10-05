import axios from "axios"

export const softDeleteSupplier = async (id) => {
  const token = localStorage.getItem("token");
  
  return axios.delete(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/supplier/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}