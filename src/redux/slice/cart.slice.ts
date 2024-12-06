import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  cartItems: ICartItem[];
}

const initialState: IState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<ICartItem>) => {
      state.cartItems.push(payload);
    },
    removeFromCart: (state, { payload: itemId }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    removeAll: (state) => {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
