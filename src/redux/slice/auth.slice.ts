import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserRole } from "src/utils/enums";

export interface IInitState {
  isAuthenticated: boolean;

  userInfo: IUserinfo;

  accessToken: string;

  refreshToken: string;
}

export interface IUserinfo {
  id: number;
  sub: string;
  role: UserRole;
}

export interface IPayload extends IUserinfo {
  accessToken: string;
  refreshToken: string;
}

const initialState: IInitState = {
  isAuthenticated: false,

  userInfo: {
    id: 0,
    sub: "",
    role: UserRole.Default,
  },

  accessToken: "",

  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<IPayload>) => {
      const { accessToken, refreshToken, ...rest } = payload;
      state.isAuthenticated = true;
      state.userInfo = rest;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = initialState.userInfo;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
