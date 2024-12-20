import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    current: null,
    isLoggedIn: false,
    errorMessage: null,
    token: null,
    isLoading: false,
    message: "",
    currentCart: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.current = null;
      state.isLoggedIn = false;
      state.errorMessage = null;
      state.token = null;
      state.isLoading = false;
      state.message = "";
    },
    clearMessage: (state, action) => {
      state.message = "";
    },
    updateCart: (state, action) => {
      const { _id, quantity, color } = action.payload;
      const updateItem = state.currentCart.find(
        (item) =>
          item.product._id === _id &&
          item.color.toLowerCase() === color.toLowerCase()
      );
      if (updateItem) {
        updateItem.quantity = quantity;
      } else {
        state.message = `Sản phẩm với ID ${_id} và màu ${color} không tồn tại trong giỏ hàng`;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isLoading = true;
    });
    builder
      .addCase(actions.getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
        state.errorMessage = null;
        state.isLoggedIn = true;
        state.currentCart = action.payload.cart;
      })
      .addCase(actions.getCurrent.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message || "Failed to login";
        state.isLoggedIn = false;
        state.token = null;
        state.message = "Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại...";
      });
  },
});
export const { login, logout, clearMessage, updateCart } = userSlice.actions;
export default userSlice.reducer;
