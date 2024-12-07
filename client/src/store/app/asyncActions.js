import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const apiGetCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetCategories();
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response || error);
    }
  }
);
