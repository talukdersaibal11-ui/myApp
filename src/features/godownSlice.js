import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

export const fetchGodowns = createAsyncThunk(
    "godown/fetch",
    async(_, thunkAPI) => {
        try {
            const response = await api.get("/admin/godown");
            return response.data.result.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


const godownSlice = createSlice({
    name: 'godown',
    initialState:{
        godowns: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchGodowns.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchGodowns.fulfilled, (state, action) => {
            state.loading = false;
            state.godowns = action.payload;
        })
        .addCase(fetchGodowns.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });
    }
});

export default godownSlice.reducer;