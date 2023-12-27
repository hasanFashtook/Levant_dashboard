import { createAsyncThunk } from "@reduxjs/toolkit";
import { catchError, formikValuesTypes } from '@/types/types'
import { addProducts } from "@/app/(auth)/Api";
import { AxiosInstance } from "axios";


export const addProduct = createAsyncThunk(
  'productsSlice/addProduct',
  async ({ productDetails, axiosAuth }: {
    productDetails: formikValuesTypes,
    axiosAuth: AxiosInstance
  }, { rejectWithValue }) => {
    try {
      let Pr = await axiosAuth.post(addProducts, productDetails);
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
