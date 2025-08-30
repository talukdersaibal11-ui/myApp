import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

export const createCategory = createAsyncThunk(
    "category/addCategory",
    async ({categoryName}, {rejectWithValue}) => {
        try {
            const response = await api.post("/admin/category", {categoryName});
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

const categorySlice = createSlice({
    name:"category",
    initialState:{
        data: [],
        loading:false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        })
    }
});

export default categorySlice.reducer;