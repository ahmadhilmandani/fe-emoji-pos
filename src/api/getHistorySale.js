import axios from "axios"

export const getHistorySale = async (queryParam) => {
  const token = localStorage.getItem("token");
  
  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/sale/history${queryParam ? queryParam : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}