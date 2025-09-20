import axios from "axios"

export const postPurchase = async (payload) => {
  const token = localStorage.getItem('token')

  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/purchase`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}