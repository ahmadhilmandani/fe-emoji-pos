import axios from "axios"

export const postProduct = async (payload) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/product`,
    payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}