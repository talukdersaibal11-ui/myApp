import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// create subcategory
export const createSubCategory = createAsyncThunk(
    "subcategory/create",
    async(formData, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/subcategory", formData);
            return response.data.result;
        } catch (error) {
            return rejectWithValue(error.data || "Something went wrong");
        }
    }
);

// Fetch Sub Category
export const fetchSubcategory = createAsyncThunk(
    "fetch/subcategory",
    async(_, thunkAPI) => {
        try {
            const response = await api.get("/admin/subcategory");
            return response.data.result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.data || "Error fetching subcategories"
            );
        }
    }
);

// Update Sub Category
export const updateSubCategory = createAsyncThunk(
    "update/subcategory",
    async (subCategoryData) => {
        const response = await api.put(`/admin/subcategory/${subCategoryData.id}`, subCategoryData);
        return response.data.result;
    }
);

// Update Sub Category
export const deleteSubCategory = createAsyncThunk(
    "delete/subcategory",
    async (id) => {
        await api.delete(`/admin/subcategory/${id}`);
        return id;
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
        // Fetch Sub Category
        builder
            .addCase(fetchSubcategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubcategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSubcategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
        // Create Sub Category
        builder
            .addCase(createSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, action.payload];
            })
            .addCase(createSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });

        // Update Sub Category
        builder
            .addCase(updateSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });

        builder
            .addCase(deleteSubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default subCategorySlice.reducer;