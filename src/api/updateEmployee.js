import axios from "axios"

export const updateEmployee = async (id, payload) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/auth/${id}`,
    payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}