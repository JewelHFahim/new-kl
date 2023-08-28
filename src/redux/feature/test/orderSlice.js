// cartSlice.js (Redux slice for cart)
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    addItemToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addItemToCart } = orderSlice.actions;
export default orderSlice.reducer;
