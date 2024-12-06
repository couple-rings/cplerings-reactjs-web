import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getConfigs } from "src/services/config.service";

export interface IState {
  configs: IConfigItem[];
  status: "idle" | "fetching" | "fetched" | "failed";
  error: string;
}

const initialState: IState = {
  configs: [],
  status: "idle",
  error: "",
};

export const fetchConfigs = createAsyncThunk(
  "configs/fetchConfigs",
  async () => {
    const response = await getConfigs();
    return response;
  }
);

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    saveConfig: (state, { payload }: PayloadAction<IConfigItem[]>) => {
      state.configs = payload;
    },
    removeConfig: (state) => {
      state.configs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigs.pending, (state) => {
        state.status = "fetching";
      })
      .addCase(fetchConfigs.fulfilled, (state, action) => {
        state.status = "fetched";
        if (action.payload.data) state.configs = action.payload.data.items;
      })
      .addCase(fetchConfigs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ? action.error.message : "";
      });
  },
});

// Action creators are generated for each case reducer function
export const { saveConfig, removeConfig } = configSlice.actions;

export default configSlice.reducer;
