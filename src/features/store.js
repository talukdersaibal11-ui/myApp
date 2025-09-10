// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import godownReducer from "./godownSlice"
import categoryReducer from "./categorySlice"
import subCategoryReducer from "./subCategorySlice"
import departmentReducer from "./departmentSlice"
import designationReducer from "./designationSlice"
import brandReducer from "./brandSlice"
import sizeReducer from "./sizeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    godown: godownReducer,
    category: categoryReducer,
    subcategory: subCategoryReducer,
    department: departmentReducer,
    designation: designationReducer,
    brands: brandReducer,
    size: sizeReducer,
  },
});
