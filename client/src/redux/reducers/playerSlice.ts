import { PlayerState } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlayerState[] = [];

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<PlayerState>) => {
      state.push(action.payload);
    },
  },
});
export const { addPlayer } = playerSlice.actions;
export default playerSlice.reducer;
