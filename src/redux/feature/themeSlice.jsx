import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: "keyLagbe",
  status: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeChange: (state) => {
      // localStorage.setItem("status", JSON.stringify(!state.status));
      // const storedStatus = JSON.parse(localStorage.getItem("status")) || false;
      state.status = !state.status;
    },
  },
});

export const { themeChange } = themeSlice.actions;
export default themeSlice.reducer;
