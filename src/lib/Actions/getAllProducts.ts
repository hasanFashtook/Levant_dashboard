import { createAsyncThunk } from "@reduxjs/toolkit";
import { allProducts } from "@/app/(auth)/Api";
import { catchError } from '@/types/types'
import { AxiosInstance } from "axios";


export const getProductsPerCategories = createAsyncThunk(
  'productsSlice/getProductsPerCategories',
  async ({ activePage, category, axiosAuth }: {
    activePage: number,
    category: string | undefined,
    axiosAuth: AxiosInstance
  }, { rejectWithValue }) => {
    const category_id = category == 'youtube'
      ? 1
      : category == 'facebook'
        ? 2
        : category == 'instagram'
          ? 3
          : category == 'telegram'
            ? 4
            : null

    try {
      let Pr = await axiosAuth.get(`${allProducts}/?filter[category_id]=${category_id}&perPage=${3}&page=${activePage}`);
      return Pr.data.data;
    } catch (error: catchError) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
