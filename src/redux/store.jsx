import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./feature/menuSlice";
import userSlice from "./feature/userSlice";
import apiSlice from "./api/apiSlice";
import thunk from "redux-thunk";
import buyerSlice from "./feature/buyers/buyerSlice";
import supplierSlice from "./feature/supplier/supplierSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userSlice,
    buyer: buyerSlice,
    supplier:supplierSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, thunk),
});
