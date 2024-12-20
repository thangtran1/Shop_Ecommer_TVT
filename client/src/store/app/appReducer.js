import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
    errorMessage: null,
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state) => {
      state.isShowCart = !state.isShowCart;
      state.isShowModal = false;
    },
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

export const { showModal, showCart } = appSlice.actions;
export default appSlice.reducer;
