import axios from "axios"

export const getAllUserInfo = async (storeId) => {
  return axios.get(`${import.meta.env.VITE_DEV_API_BASE_URL}/user-info?store_id=${storeId}`)
}