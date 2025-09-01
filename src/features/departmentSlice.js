import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js"

// Create Department
export const createDepartment = createAsyncThunk(
    "department/createDepartment",
    async (departmentData) => {
        const response = await api.post("/admin/department", departmentData);
        return response.data;
    }
);

// Fetch All departments
export const fetchDepartments = createAsyncThunk(
    "department/fetchDepartments",
    async () => {
        const response = await api.get("/admin/department");
        return response.data;
    }
);

// Single Department
export const fetchSingleDepartment = createAsyncThunk(
    "department/fetchSingleDepartment",
    async (deptId) => {
        const response = await api.get(`/admin/department/${deptId}`);
        return response.data;
    }
);

// update department
export const updateDepartment = createAsyncThunk(
    "department/updateDepartment",
    async ({ id, data }) => {
        const response = await api.put(`/admin/department/${id}`, data);
        return response.data;
    }
);

// Delete department
export const deleteDepartment = createAsyncThunk(
    "department/deleteDepartment",
    async (deptId) => {
        await api.delete(`/admin/department/${deptId}`);
        return deptId;
    }
);

const departmentSlice = createSlice({
    name: "department",
    initialState: {
        departments: [],
        department: null,
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
            state.departments.push(action.payload.result);
        })
        .addCase(createDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //Fetch Department
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload.result.data;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Fetch Single Department
        builder
            .addCase(fetchSingleDepartment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.department = action.payload.result;
            })
            .addCase(fetchSingleDepartment.rejected, (state, action) => {
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