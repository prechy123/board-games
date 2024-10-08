import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: "",
  profilePictureUrl: "",
  username: "",
  playerId: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth: (state, action) => {
      const { isAuthenticated, email, profilePictureUrl, username, playerId } =
        action.payload;
      state.isAuthenticated = isAuthenticated;
      state.email = email;
      state.profilePictureUrl = profilePictureUrl;
      state.username = username;
      state.playerId = playerId;
    },
    notAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { isAuth, notAuth } = authSlice.actions;
export default authSlice.reducer;
