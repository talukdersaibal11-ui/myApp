import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// create subcategory
export const createSubCategory = createAsyncThunk(
  "subcategory/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/subcategories", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); // add new subcategory
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default subCategorySlice.reducer;
