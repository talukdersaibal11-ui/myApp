import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

// Create Brand
export const createBrand = createAsyncThunk("brands/createBrand", async (brandData) => {
    const response = await api.post("/admin/brand", brandData);
    return response.data.result;
});

// Fetch All Brand
export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
    const response = await api.get("/admin/brand");
    return response.data.result.data;
});

// Update Brand
export const updateBrand = createAsyncThunk(
    "brands/updateBrand",
    async (brandData) => {
        const response = await api.put(`/admin/brand/${brandData.id}`, brandData);
        return response.data.result;
    }
);

// Delete Brand
export const deleteBrand = createAsyncThunk(
    "brands/deleteBrand",
    async (id) => {
        await api.delete(`/admin/brand/${id}`);
        return id;
    }
);

const brandSlice = createSlice({
    name: "brands",
    initialState: {
        brands: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.brands.push(action.payload);
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(updateBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.brands.findIndex((brand) => brand.id === action.payload.id);
                if (index !== -1) {
                    state.brands[index] = action.payload;
                }
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(deleteBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = state.brands.filter((brand) => brand.id !== action.payload);
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default brandSlice.reducer;
