import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

// Fetch Employees
export const fetchEmployees = createAsyncThunk(
    'fetch/employee',
    async () => {
        const response = await api.get("/admin/employee");

        return response.data.result.data;
    }
);

// Create Employee
export const createEmployee = createAsyncThunk(
    'create/employee',
    async (data) => {
        const response = await api.post("/admin/employee", data);

        return response.data.result;
    }
);

// Fetch Single Employee
export const getSingleEmployee = createAsyncThunk(
    'single/employee',
    async (id) => {
        const response = await api.get(`/admin/employee/${id}`);

        return response.data.result;
    }
);

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        employee: null,
        loading: false,
        error: null
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        builder
            .addCase(getSingleEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(getSingleEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default employeeSlice.reducer;