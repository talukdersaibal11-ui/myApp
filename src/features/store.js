// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import godownReducer from "./godownSlice"
import categoryReducer from "./categorySlice"
import departmentReducer from "./departmentSlice"
import designationReducer from "./designationSlice"
import brandReducer from "./brandSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    godown: godownReducer,
    category: categoryReducer,
    department: departmentReducer,
    designation: designationReducer,
    brands: brandReducer,
  },
});
