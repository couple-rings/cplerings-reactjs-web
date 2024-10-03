import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  districts: IDistrict[];
}

const initialState: IState = {
  districts: [],
};

export const districtSlice = createSlice({
  name: "district",
  initialState,
  reducers: {
    saveList: (state, { payload }: PayloadAction<IDistrict[]>) => {
      state.districts = payload;
    },
    removeList: (state) => {
      state.districts = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveList, removeList } = districtSlice.actions;

export default districtSlice.reducer;
