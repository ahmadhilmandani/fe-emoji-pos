import { configureStore } from '@reduxjs/toolkit'
import registerStoreSlice from './slice/registerStoreSlice.js'
import userInfoSlie  from './slice/userInfoSlice.js'

export default configureStore({
  reducer: {
    registerStoreSlice: registerStoreSlice,
    userInfoSlie: userInfoSlie
  }
})