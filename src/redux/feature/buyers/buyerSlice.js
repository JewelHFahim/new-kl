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
<<<<<<< HEAD
      state.total = Number(state.total) + Number(actions.payload.product_price) * Number(actions.payload.quantity);
    },

    removeFromInvoice: (state, actions) => {
      state.addedProducts = state.addedProducts.filter((product) => product.product !== actions.payload.product);
      state.total = Number(state.total) - Number(actions.payload.product_price) * Number(actions.payload.quantity);
      console.log(actions)
=======
      state.total =
        Number(state.total) + (Number(actions.payload.product_price) * Number(actions.payload.quantity)) - 
        (Number(actions.payload.discount_price) * Number(actions.payload.quantity));
>>>>>>> 1a5d554f8046b4695dc01f729ba09c2a52993a24
    },

    addBuyer: (state, actions) => {
      state.addedBuyer.push(actions.payload);
    },

  },
});

export const { addBuyer, addToInvoice, removeSingle, removeFromInvoice } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
