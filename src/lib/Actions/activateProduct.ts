import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../Axios";
import { activateProducts, disActivateProducts } from "@/app/(auth)/Api";
import { catchError } from '@/types/types'

export const activeProduct = createAsyncThunk(
  'productsSlice/activeProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      let Pr = await Axios.post(`${activateProducts}/${productId}`, {});
      return Pr.data.data;
    } catch (error: catchError) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);
export const disActiveProduct = createAsyncThunk(
  'productsSlice/disActiveProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      let Pr = await Axios.post(`${disActivateProducts}/${productId}`, {});
      return Pr.data.data;
    } catch (error: catchError) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
