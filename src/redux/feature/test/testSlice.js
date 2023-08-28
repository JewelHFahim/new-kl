// userSlice.js (Redux slice for user)
import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'test',
  initialState: {
    generatedId: null,
  },
  reducers: {
    setGeneratedId: (state, action) => {
      state.generatedId = action.payload;
    },
  },
});

export const { setGeneratedId } = testSlice.actions;
export default testSlice.reducer;
