import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

// Create Department
export const createDepartment = createAsyncThunk(
    "department/createDepartment",
    async (departmentData) => {
        const response = await api.post("/admin/department", departmentData);
        return response.data.result;
    }
);

// Fetch All departments
export const fetchDepartments = createAsyncThunk(
    "department/fetchDepartments",
    async () => {
        const response = await api.get("/admin/department");
        return response.data.result.data;
    }
);

// update department
export const updateDepartment = createAsyncThunk(
    "department/updateDepartment",
    async (departmentData) => {
        const response = await api.put(`/admin/department/${departmentData.id}`, departmentData);
        return response.data.result;
    }
);

// Delete department
export const deleteDepartment = createAsyncThunk(
    "department/deleteDepartment",
    async (id) => {
        await api.delete(`/admin/department/${id}`);
        return id;
    }
);

const departmentSlice = createSlice({
    name: "department",
    initialState: {
        departments: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDepartment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.departments.push(action.payload);
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(updateDepartment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.department = action.payload.result;
                const index = state.departments.findIndex((department) => department.id === action.payload.id);
                if(index !== -1){
                    state.departments[index] = action.payload;
                }
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Delete Department
        builder.addCase(deleteDepartment.fulfilled, (state, action) => {
            state.departments = state.departments.filter(
                (dept) => dept.id !== action.payload
            );
        });
    }
});


export default departmentSlice.reducer;