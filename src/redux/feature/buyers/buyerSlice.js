import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyerProducts: [],
  addedBuyer: [],
  orderedProducts:[],
  total: 0,
};

export const invoiceSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {

    addToInvoice: (state, actions) => {
      state.addedProducts.push(actions.payload);
      state.total = Number(state.total) + (Number(actions.payload.product_price) * Number(actions.payload.quantity)) ;
    },
    
    addBuyer: (state, actions) => {
      state.addedBuyer.push(actions.payload);
    },

    addOrderedProducts:(state, actions)=>{
      state.buyerProducts.push(actions.payload);
    },


  },
});

export const { addBuyer, addBuyerUnderProducts, addOrderedProducts } = invoiceSlice.actions;
export default invoiceSlice.reducer;
