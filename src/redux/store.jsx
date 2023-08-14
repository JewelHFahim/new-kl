import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./feature/themeSlice";
import menuReducer from "./feature/menuSlice";
import { productApi } from "./api/apiSlice";
import userSlice from "./feature/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    menu: menuReducer,
    user: userSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
