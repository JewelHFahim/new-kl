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

      //   const existing = state.products.find(
      //     (product) => product._id === actions.payload._id
      //   );
      //   if (existing) {
      //     existing.quantity = existing.quantity + 1;
      //   } else {
      //     state.products.push({ ...actions.payload, quantity: 1 });
      //   }

      //   state.total = Number(state.total) + Number(actions.payload.price);
    },

    removeSingle: (state, actions) => {
      const existing = state.products.find(
        (product) => product._id === actions.payload._id
      );
      if (existing && existing.quantity > 1) {
        existing.quantity = existing.quantity - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== actions.payload._id
        );
      }

      state.total = Number(state.total) - Number(actions.payload.price);
    },

    removeFromList: (state, actions) => {
      state.addedProducts = state.addedProducts.filter(
        (product) => product.id !== actions.payload.id
      );

      state.total =
        Number(state.total) -
        Number(actions.payload.price) * Number(actions.payload.quantity);
    },
  },
});

export const { addToInvoice, removeFromList, removeSingle } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
