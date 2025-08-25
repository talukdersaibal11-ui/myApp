// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import godownReducer from "./godownSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    godown: godownReducer,
  },
});
