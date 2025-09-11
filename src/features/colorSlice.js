import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

// Fetch Color
export const fetchColors = createAsyncThunk(
    'fetch/color',
    async () => {
        const response = await api.get("/admin/color");
        return response.data.result.data;
    }
);

// Create Color
export const createColor = createAsyncThunk(
    'create/color',
    async (colorData) => {
        const response = api.post("/admin/color", colorData);
        return (await response).data.result;
    }
);

// Update Color
export const updateColor = createAsyncThunk(
    'update/color',
    async (colorData) => {
        const response = await api.put(`/admin/color/${colorData.id}`, colorData);
        return response.data.result;
    }
);

// Delete Color
export const deleteColor = createAsyncThunk(
    'delete/color',
    async (id) => {
        await api.delete(`/admin/color/${id}`);
        return id;
    }
);

const colorSlice = createSlice({
    name: "colors",
    initialState: {
        colors: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchColors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchColors.fulfilled, (state,action) => {
                state.loading = false;
                state.colors = action.payload;
            })
            .addCase(fetchColors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createColor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createColor.fulfilled, (state,action) => {
                state.loading = false;
                state.colors.push(action.payload);
            })
            .addCase(createColor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(updateColor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateColor.fulfilled, (state,action) => {
                state.loading = false;
                const index = state.colors.findIndex((color) => color.id === action.payload.id);
                if(index !== -1){
                    state.colors[index] = action.payload;
                }
            })
            .addCase(updateColor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteColor.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.loading = false;
                state.colors = state.colors.filter((color) => color.id !== action.payload);
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default colorSlice.reducer;