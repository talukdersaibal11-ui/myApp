import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

// Create Size
export const createSize = createAsyncThunk("sizes/createSize", async (sizeData) => {
    const response = await api.post("/admin/size", sizeData);
    return response.data.result;
});

// Fetch All Size
export const fetchSizes = createAsyncThunk("sizes/fetchSizes", async () => {
    const response = await api.get("/admin/size");
    return response.data.result.data;
});

// Update Size
export const updateSize = createAsyncThunk(
    "brands/updateBrand",
    async (sizeData) => {
        const response = await api.put(`/admin/size/${sizeData.id}`, sizeData);
        return response.data.result;
    }
);

// Delete Size
export const deleteSize = createAsyncThunk(
    "brands/deleteSize",
    async (id) => {
        await api.delete(`/admin/size/${id}`);
        return id;
    }
);

const sizeSlice = createSlice({
    name: "sizes",
    initialState: {
        sizes: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSize.fulfilled, (state, action) => {
                state.loading = false;
                state.sizes.push(action.payload);
            })
            .addCase(createSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(fetchSizes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSizes.fulfilled, (state, action) => {
                state.loading = false;
                state.sizes = action.payload;
                console.log(state.sizes);
            })
            .addCase(fetchSizes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(updateSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSize.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.sizes.findIndex((size) => size.id === action.payload.id);
                if (index !== -1) {
                    state.sizes[index] = action.payload;
                }
            })
            .addCase(updateSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(deleteSize.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSize.fulfilled, (state, action) => {
                state.loading = false;
                state.sizes = state.sizes.filter((size) => size.id !== action.payload);
            })
            .addCase(deleteSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default sizeSlice.reducer;
