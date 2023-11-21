import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addedProducts:[],
  addedBuyer: [],
  total: 0,
};

export const invoiceSlice = createSlice({
  name: "buyer",
  initialState,

  reducers: {

    addToInvoice: (state, actions) => {
      state.addedProducts.push(actions.payload);
      state.total = Number(state.total) + Number(actions.payload.product_price) * Number(actions.payload.quantity);
    },

    removeFromInvoice: (state, actions) => {
      state.addedProducts = state.addedProducts.filter((product) => product.product !== actions.payload.product);
      state.total = Number(state.total) - Number(actions.payload.product_price) * Number(actions.payload.quantity);
      console.log(actions)
    },

    addBuyer: (state, actions) => {
      state.addedBuyer.push(actions.payload);
    },

  },
});

export const { addBuyer, addToInvoice, removeSingle, removeFromInvoice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
