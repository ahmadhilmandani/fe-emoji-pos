import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlie = createSlice({
  name: 'userInfo',
  initialState: {
    id: '',
    name: '',
    email: '',
    role: '',
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.role = action.payload.role
    }
  }
})


export const { setUserInfo } = userInfoSlie.actions

export default userInfoSlie.reducer