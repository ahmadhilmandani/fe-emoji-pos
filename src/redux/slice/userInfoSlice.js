import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlie = createSlice({
  name: 'userInfo',
  initialState: {
    id: '',
    name: '',
    email: '',
    role: '',
    storeId: '',
    maxPercentageEmojiDiscount: 0
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.role = action.payload.role
      state.storeId = action.payload.storeId
      state.maxPercentageEmojiDiscount = action.payload.maxPercentageEmojiDiscount
    }
  }
})


export const { setUserInfo } = userInfoSlie.actions

export default userInfoSlie.reducer