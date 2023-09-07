import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  isLoading: false,
  token: "",
  error: "",
  message: "",
};

export const loginUser = createAsyncThunk("loginUser", async (body) => {
  const res = await fetch("http://192.168.3.16:8000/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addLogout: (state) => {
      state.token = null;
      localStorage.clear();
    },
  },

  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.isLoding = false;
      state.error = payload.error;
    },

    [loginUser.fulfilled]: (state, action) => {
      if (action.error) {
        state.isLoading = false;
        state.error = action.payload;
      } else {
        state.token = action.payload.token;
        console.log(state.token);
        state.isLoading = false;
        localStorage.setItem("token", JSON.stringify(state.token));
        const gotToken = localStorage.getItem("token");
        state.token = gotToken;
      }
    },
  },
});

export const { addToken, addEmail, addLogout } = userSlice.actions;
export default userSlice.reducer;
