import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const productSlider = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.apiGetNewProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder
      .addCase(actions.apiGetNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newProducts = action.payload.products;
        state.errorMessage = null;
      })
      .addCase(actions.apiGetNewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.payload?.message || "Failed to load products";
      });
  },
});

export default productSlider.reducer;
