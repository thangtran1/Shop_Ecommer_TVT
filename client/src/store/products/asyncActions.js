import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const apiGetNewProducts = createAsyncThunk(
  "product/newProducts/",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetProducts({ sort: "-createdAt" });
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response || error);
    }
  }
);
