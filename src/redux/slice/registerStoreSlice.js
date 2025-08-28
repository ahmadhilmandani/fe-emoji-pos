import { createSlice } from "@reduxjs/toolkit";

export const registerStoreSlice = createSlice({
  name: 'registerStore',
  initialState: {
    name: '',
    email: '',
    password: '',
    age: 0,
    sex: '',
    phone: '',
    nameStore: '',
    addressStore: '',
    phoneStore: '',
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setAge: (state, action) => {
      state.age = action.payload
    },
    setSex: (state, action) => {
      state.sex = action.payload
    },
    setPhone: (state, action) => {
      state.phone = action.payload
    },
    setNameStore: (state, action) => {
      state.nameStore = action.payload
    },
    setAddressStore: (state, action) => {
      state.addressStore = action.payload
    },
    setPhoneStore: (state, action) => {
      state.phoneStore = action.payload
    },
  }
})


export const { setName, setEmail, setPassword, setAge, setSex, setPhone, setNameStore, setAddressStore, setPhoneStore } = registerStoreSlice.actions

export default registerStoreSlice.reducer