import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

export const createCategory = createAsyncThunk(
    "category/addCategory",
    async({ name }, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/category", { name });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                "Something went wrong"
            );
        }
    }
);

// ✅ Fetch all categories
export const fetchCategories = createAsyncThunk(
    "category/fetchCategory",
    async(_, thunkAPI) => {
        try {
            const response = await api.get("/admin/category");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error fetching categories");
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
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
    }
});

export default categorySlice.reducer;