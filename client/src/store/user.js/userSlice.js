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
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    clearMessage: (state, action) => {
      state.message = "";
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
export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
