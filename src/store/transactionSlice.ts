import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: string;
  products: any[];
  total: number;
  status: "pending" | "paid" | "failed";
  createdAt: string;
}

interface TransactionState {
  current?: Transaction;
}

const initialState: TransactionState = {
  current: undefined,
};
//Not in use
export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    registerTransaction(state, action: PayloadAction<Transaction>) {
      state.current = action.payload;
      localStorage.setItem("lastTransaction", JSON.stringify(action.payload));
    },
    clearTransaction(state) {
      state.current = undefined;
      localStorage.removeItem("lastTransaction");
    },
  },
});

export const { registerTransaction, clearTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
