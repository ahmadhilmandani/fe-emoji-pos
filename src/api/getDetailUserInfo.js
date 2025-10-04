import axios from "axios"

export const getDetailUserInfo = async (id) => {
  return axios.get(`${import.meta.env.VITE_DEV_API_BASE_URL}/user-info/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}