import axios from "axios"

export const getProduct = async (queryParam) => {
  const token = localStorage.getItem("token");
  
  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/product${queryParam ? queryParam : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}