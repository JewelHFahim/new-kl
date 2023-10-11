import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addedProducts: [],
  addedSupplier: [],
  supplierUnderProducts: [],
  orderedProducts:[],
  total: 0,
};

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    addToInvoice: (state, actions) => {
      state.addedProducts.push(actions.payload);
      state.total = Number(state.total) + (Number(actions.payload.product_price) * Number(actions.payload.quantity));
    },
    addSuppliers: (state, actions) => {
      state.addedSupplier.push(actions.payload);
    },
    addOrderedProducts:(state, actions)=>{
      state.orderedProducts.push(actions.payload);
    },
    addSupplierUnderProducts: (state,actions)=>{
      state.supplierUnderProducts.push(actions.payload)
    }
  },
});

export const { addToInvoice, addSuppliers, addOrderedProducts, addSupplierUnderProducts } = supplierSlice.actions;
export default supplierSlice.reducer;
