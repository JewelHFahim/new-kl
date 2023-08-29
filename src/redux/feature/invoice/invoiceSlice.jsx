import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addedProducts: [],
  total: 0,
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addToInvoice: (state, actions) => {
      state.addedProducts.push(actions.payload);
      state.total = Number(state.total) + (Number(actions.payload.buying_price) * Number(actions.payload.stock)) ;
    },
  },
});

export const { addToInvoice} = invoiceSlice.actions;
export default invoiceSlice.reducer;
