import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  currentRoute: string;
}

const initialState: IState = {
  currentRoute: "/",
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    saveRoute: (state, { payload }: PayloadAction<string>) => {
      state.currentRoute = payload;
    },
    removeRoute: (state) => {
      state.currentRoute = "/";
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveRoute, removeRoute } = routeSlice.actions;

export default routeSlice.reducer;
