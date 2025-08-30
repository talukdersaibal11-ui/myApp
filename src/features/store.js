// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import godownReducer from "./godownSlice"
import categoryReducer from "./categorySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    godown: godownReducer,
    category: categoryReducer,
  },
});
