import axios from "axios"

export const softDeleteEmployee = async (id) => {
  const token = localStorage.getItem("token");
  
  return axios.delete(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/auth/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}