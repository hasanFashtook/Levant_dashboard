import { createAsyncThunk } from "@reduxjs/toolkit";
import { catchError, formikValuesTypes } from '@/types/types'
import { editProducts } from "@/app/(auth)/Api";
import { AxiosInstance } from "axios";


export const editProduct = createAsyncThunk(
  'productsSlice/editProduct',
  async ({ productDetails, id, axiosAuth }: {
    productDetails: formikValuesTypes,
    id: number,
    axiosAuth: AxiosInstance
  }, { rejectWithValue }) => {
    try {
      let Pr = await axiosAuth.post(`${editProducts}/${id}`, productDetails);
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
