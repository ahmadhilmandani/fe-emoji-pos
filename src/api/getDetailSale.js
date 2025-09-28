import axios from "axios"

export const getDetailSale = async (id) => {
  const token = localStorage.getItem("token");
  
  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/sale/history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}