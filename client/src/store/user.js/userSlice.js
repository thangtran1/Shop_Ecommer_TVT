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
      })
      .addCase(actions.getCurrent.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message || "Failed to login";
      });
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
