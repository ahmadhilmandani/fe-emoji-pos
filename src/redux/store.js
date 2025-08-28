import { configureStore } from '@reduxjs/toolkit'
import registerStoreSlice from './slice/registerStoreSlice.js'

export default configureStore({
  reducer: {
    registerStoreSlice: registerStoreSlice
  }
})