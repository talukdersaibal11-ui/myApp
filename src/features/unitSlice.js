import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

// Fetch Unit
export const fetchUnit = createAsyncThunk(
    'fetch/unit',
    async () => {
        const response = await api.get("/admin/unit");
        return response.data.result.data;
    }
);

// Create Unit
export const createUnit = createAsyncThunk(
    'create/unit',
    async (unitData) => {
        const response = await api.post("/admin/unit", unitData);
        return response.data.result;
    }
);

// Update Unit
export const updateUnit = createAsyncThunk(
    'update/unit',
    async (unitData) => {
        const response = await api.put(`/admin/unit/${unitData.id}`, unitData);
        return response.data.result;
    }
);

// Update Unit
export const deleteUnit = createAsyncThunk(
    'delete/unit',
    async (id) => {
        await api.delete(`/admin/unit/${id}`);
        return id;
    }
);

const unitSlice = createSlice({
    name: "units",
    initialState: {
        units: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUnit.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUnit.fulfilled, (state, action) => {
                state.loading = false;
                state.units = action.payload;
            })
            .addCase(fetchUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(createUnit.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUnit.fulfilled, (state, action) => {
                state.loading = false;
                state.units.push(action.payload);
            })
            .addCase(createUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(updateUnit.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUnit.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.units.findIndex((unit) => unit.id === action.payload.id);
                if(index !== -1){
                    state.units[index] = action.payload;
                }
            })
            .addCase(updateUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(deleteUnit.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUnit.fulfilled, (state, action) => {
                state.loading = false;
                state.units = state.units.filter((unit) => unit.id !== action.payload);
            })
            .addCase(deleteUnit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default unitSlice.reducer;