import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetCurrent();
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response.result;
    } catch (error) {
      return rejectWithValue(error.response || error);
    }
  }
);
