import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleDrawer } = menuSlice.actions;

export default menuSlice.reducer;
