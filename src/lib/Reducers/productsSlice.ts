import { createSlice } from '@reduxjs/toolkit';
import { getProductsPerCategories } from '../Actions/getAllProducts';
import { activeProduct, disActiveProduct } from '../Actions/activateProduct';
import { addProduct } from '../Actions/addProduct';
import { itemData, productsStoreState } from '@/types/types';
import { editProduct } from '../Actions/editProduct';


const initialState: productsStoreState = {
  success: false,
  loading: false,
  error: null,
  productsData: {
    products: [],
    count: 0
  },
  activatingId: 0
}

const productsSlice = createSlice({
  initialState,
  name: 'productsSlice',
  reducers: {
    activateProductLocally: (state, { payload }) => {
      state.productsData.products.map((product: itemData) => {
        if (product.id == payload) {
          product.status = 1
        }
      });
      state.activatingId = payload
    },
    disActivateProductLocally: (state, { payload }) => {
      state.productsData.products.map((product: itemData) => {
        if (product.id == payload) {
          product.status = 2
        }
      })
      state.activatingId = payload
    },
  },
  extraReducers: (builder) => {
    // get products
    builder.addCase(getProductsPerCategories.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      state.productsData = payload
    });
    builder.addCase(getProductsPerCategories.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    });
    builder.addCase(getProductsPerCategories.rejected, (state, { payload }) => {
      state.success = false
      state.loading = false
      state.error = payload
    });
    // // activate specifc product
    builder.addCase(activeProduct.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      state.activatingId = 0
    });
    builder.addCase(activeProduct.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    });
    builder.addCase(activeProduct.rejected, (state, { payload }) => {
      state.success = false
      state.loading = false
      state.error = payload;
      state.activatingId = 0
    });

    // disactivate specifc product
    builder.addCase(disActiveProduct.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      state.activatingId = 0

    });
    builder.addCase(disActiveProduct.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    });
    builder.addCase(disActiveProduct.rejected, (state, { payload }) => {
      state.success = false
      state.loading = false
      state.error = payload
      state.activatingId = 0
    });

    // add new product
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    });
    builder.addCase(addProduct.rejected, (state, { payload }) => {
      state.success = false
      state.loading = false
      state.error = payload
    });
    // add new product
    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
    });
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    });
    builder.addCase(editProduct.rejected, (state, { payload }) => {
      state.success = false
      state.loading = false
      state.error = payload
    });

  }
});

export const { activateProductLocally, disActivateProductLocally } = productsSlice.actions;
export default productsSlice.reducer;