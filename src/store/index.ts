import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import transactionReducer from "./transactionSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    transaction: transactionReducer,
  },
});
store.subscribe(() => {
  const state: RootState = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
