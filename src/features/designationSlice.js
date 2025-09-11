import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

// Create Designation
export const createDesignation = createAsyncThunk(
    "designation/createDesignation",
    async (designationData) => {
        const response = await api.post("/admin/designation", designationData);
        return response.data.result;
    }
);

//Fetched All Designations
export const getAllDesignations = createAsyncThunk(
    "designation/getAllDesignations",
    async () => {
        const response = await api.get("/admin/designation");
        return response.data.result.data;
    }
);

//Update Designation
export const updateDesignation = createAsyncThunk(
    "designation/updateDesignation",
    async ( data ) => {
        const response = await api.put(`/admin/designation/${data.id}`, data);
        return response.data.result;
    }
);

//Delete Designations
export const deleteDesignation = createAsyncThunk(
    "designation/deleteDesignation",
    async (id) => {
        await api.delete(`/admin/designation/${id}`);
        return id;
    }
);

const designationSlice = createSlice({
    name: "designation",
    initialState: {
        designations: [],
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
                state.designations.push(action.payload);
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
                state.designations = action.payload;
            })
            .addCase(getAllDesignations.rejected, (state, action) => {
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
                    (designation) => designation.id === action.payload.id
                );
                if (index !== -1) {
                    state.designations[index] = action.payload;
                }
            })
            .addCase(updateDesignation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Delete Designation
        builder.addCase(deleteDesignation.fulfilled, (state, action) => {
            state.designations = state.designations.filter(
                (designation) => designation.id !== action.payload
            );
        });
    },
});

export default designationSlice.reducer;