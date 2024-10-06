import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "src/utils/enums";

export interface IInitState {
  isAuthenticated: boolean;

  userInfo: IPayload;
}

export interface IPayload {
  id: number;
  sub: string;
  role: UserRole;
}

const initialState: IInitState = {
  isAuthenticated: false,

  userInfo: {
    id: 0,
    sub: "",
    role: UserRole.Default,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<IPayload>) => {
      state.isAuthenticated = true;
      state.userInfo = payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = initialState.userInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
