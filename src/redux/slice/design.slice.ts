import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  requestedDesigns: number[];
}

const initialState: IState = {
  requestedDesigns: [],
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    saveRequestedDesigns: (state, { payload }: PayloadAction<number[]>) => {
      state.requestedDesigns = payload;
    },
    removeRequestedDesigns: (state) => {
      state.requestedDesigns = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveRequestedDesigns, removeRequestedDesigns } =
  designSlice.actions;

export default designSlice.reducer;
