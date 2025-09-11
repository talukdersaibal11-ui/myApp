import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

// Create Leave Type
export const createLeaveType = createAsyncThunk(
    'create/leaveType',

    async (data) => {
        const response = await api.post("/admin/leave/type", data);
        return response.data.result;
    }
);

// Fetch Leave Type
export const fetchLeaveType = createAsyncThunk(
    'fetch/leaveType',

    async () => {
        const response = await api.get("/admin/leave/type");
        return response.data.result.data;
    }
);

// Update Leave Type
export const updateLeaveType = createAsyncThunk(
    'update/leaveType',

    async (data) => {
        const response = await api.put(`/admin/leave/type/${data.id}`, data);
        return response.data.result;
    }
);

// Delete Leave Type
export const deleteLeaveType = createAsyncThunk(
    'delete/leaveType',

    async (id) => {
        await api.delete(`/admin/leave/type/${id}`);
        return id;
    }
);

const leaveTypeSlice = createSlice({
    name: "leaveType",
    initialState: {
        leaveTypes: [],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaveType.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeaveType.fulfilled, (state, action) => {
                state.loading = false;
                state.leaveTypes = action.payload;
            })
            .addCase(fetchLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(createLeaveType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLeaveType.fulfilled, (state, action) => {
                state.loading = false;
                state.leaveTypes.push(action.payload);
            })
            .addCase(createLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(updateLeaveType.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLeaveType.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.leaveTypes.findIndex((leaveType) => leaveType.id === action.payload.id);
                if(index !== -1){
                    state.leaveTypes[index] = action.payload;
                }
            })
            .addCase(updateLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(deleteLeaveType.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLeaveType.fulfilled, (state, action) => {
                state.loading = false;
                state.leaveTypes = state.leaveTypes.filter((leaveType) => leaveType.id !== action.payload);
            })
            .addCase(deleteLeaveType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default leaveTypeSlice.reducer;