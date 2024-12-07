import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.apiGetCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder
      .addCase(actions.apiGetCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.productCategories;
        state.errorMessage = null;
      })
      .addCase(actions.apiGetCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.payload?.message || "Failed to load categories";
      });
  },
});

export default appSlice.reducer;
