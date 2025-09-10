import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

// ✅ Fetch all categories
export const fetchCategories = createAsyncThunk(
    "category/fetchCategory",
    async(_, thunkAPI) => {
        try {
            const response = await api.get("/admin/category");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data || "Error fetching categories");
        }
    }
);

export const fetchCategoryList = createAsyncThunk(
    "category/fetchCategoryList",
    async(_, thunkAPI) => {
        try {
            const response = await api.get("/admin/category/list");
            return response.data.result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data || "Something wen wrong");
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: [],
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetched Category
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.result.data;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Fetched List
        builder
            .addCase(fetchCategoryList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryList.fulfilled, (state,action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCategoryList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;