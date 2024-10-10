import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import playerReducer from "./reducers/playerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer
  },
});
