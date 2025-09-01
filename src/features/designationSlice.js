import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

// Create Designation
export const createDesignation = createAsyncThunk(
    "designation/createDesignation",
    async (designationData) => {
        const response = await api.post("/admin/designation", designationData);
        return response.data;
    }
);

//Fetched All Designations
export const getAllDesignations = createAsyncThunk(
    "designation/getAllDesignations",
    async () => {
        const response = await api.get("/admin/designation");
        return response.data;
    }
);

// Get Designation by Id
export const getDesignationById = createAsyncThunk(
    "designation/getDesignationById",
    async (id) => {
        const response = await api.get(`/admin/designation/${id}`);
        return response.data;
    }
);

//Update Designation
export const updateDesignation = createAsyncThunk(
    "designation/updateDesignation",
    async ({ id, name }) => {
        const response = await api.put(`/admin/designation/${id}`, { name });
        return response.data;
    }
);

//Delete Designations
export const deleteDesignation = createAsyncThunk(
    "designation/deleteDesignation",
    async (designationId) => {
        await api.delete(`/admin/designation/${designationId}`);
        return designationId;
    }
);

const designationSlice = createSlice({
    name: "designation",
    initialState: {
        designations: [],
        designation: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Create Designation
        builder
            .addCase(createDesignation.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDesignation.fulfilled, (state, action) => {
                state.loading = false;
                state.designations.push(action.payload.result);
            })
            .addCase(createDesignation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Fetched All Designations
        builder
            .addCase(getAllDesignations.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDesignations.fulfilled, (state, action) => {
                state.loading = false;
                state.designations = action.payload.result.data;
            })
            .addCase(getAllDesignations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

        // Get Designation by Id
        builder
            .addCase(getDesignationById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDesignationById.fulfilled, (state, action) => {
                state.loading = false;
                state.designation = action.payload.result;
            })
            .addCase(getDesignationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

        // Update Designation
        builder
            .addCase(updateDesignation.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDesignation.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.designations.findIndex(
                    (desg) => desg.id === action.payload.result.id
                );
                if (index !== -1) {
                    state.designations[index] = action.payload.result;
                }
            })
            .addCase(updateDesignation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Delete Designation
        builder.addCase(deleteDesignation.fulfilled, (state, action) => {
            state.designations = state.designations.filter(
                (desg) => desg.id !== action.payload
            );
        });
    },
});

export default designationSlice.reducer;