import { configureStore } from '@reduxjs/toolkit'
import productsReduser from './Reducers/productsSlice'

export const store = configureStore({
  reducer:{
    products: productsReduser,
  }
});

export type AppDispatch = typeof store.dispatch