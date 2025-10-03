import axios from "axios"

export const postPrediction = async (textValue, file) => {
  const token = localStorage.getItem("token");
  
  const formData = new FormData()
  formData.append("text", textValue)
  formData.append("image", file)

  return axios.post(import.meta.env.VITE_API_EMOJI_POS, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
  })
}