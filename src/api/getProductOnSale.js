import axios from "axios"

export const getProductOnSale = async (queryParam) => {
  const token = localStorage.getItem("token");
  
  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/sale${queryParam ? queryParam : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}