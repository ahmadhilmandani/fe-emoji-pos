import axios from "axios"

export const getPurchaseDetail = async (id, queryParams) => {
  const token = localStorage.getItem('token')

  return axios.get(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/purchase/${id}${queryParams ? '?type=' + queryParams : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}