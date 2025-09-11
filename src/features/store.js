import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import godownReducer from "./godownSlice"
import categoryReducer from "./categorySlice"
import subCategoryReducer from "./subCategorySlice"
import departmentReducer from "./departmentSlice"
import designationReducer from "./designationSlice"
import brandReducer from "./brandSlice"
import sizeReducer from "./sizeSlice"
import colorReducer from "./colorSlice"
import unitReducer from "./unitSlice"
import leaveTypeReducer from "./leaveTypeSlice"
import employeeReducer from "./employeeSlice"

export const store = configureStore({
  reducer: {
    auth       : authReducer,
    godown     : godownReducer,
    category   : categoryReducer,
    subcategory: subCategoryReducer,
    department : departmentReducer,
    designation: designationReducer,
    brands     : brandReducer,
    size       : sizeReducer,
    color      : colorReducer,
    unit       : unitReducer,
    leaveType  : leaveTypeReducer,
    employee   : employeeReducer,
  },
});
