import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./feature/themeSlice";
import menuReducer from "./feature/menuSlice";
import userSlice from "./feature/userSlice";
import apiSlice from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    menu: menuReducer,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
