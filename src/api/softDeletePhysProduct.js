import axios from "axios"

export const softDeletePhysProduct = async (id) => {
  const token = localStorage.getItem("token");
  
  return axios.delete(
    `${import.meta.env.VITE_DEV_API_BASE_URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
}