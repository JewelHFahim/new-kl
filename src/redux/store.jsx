import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./feature/themeSlice";
import menuReducer from "./feature/menuSlice";
import userSlice from "./feature/userSlice";
import apiSlice from "./api/apiSlice";
import invoiceSlice from "./feature/invoice/invoiceSlice";
import testSlice from "./feature/test/testSlice";
import orderSlice from "./feature/test/orderSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    menu: menuReducer,
    user: userSlice,
    invoice: invoiceSlice,
    test: testSlice,
    order: orderSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, thunk),
});
