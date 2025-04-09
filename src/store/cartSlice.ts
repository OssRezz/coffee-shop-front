import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
}

interface CartItem extends Product {
  quantityInCart: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const loadCartFromStorage = (): CartState => {
  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        Array.isArray(parsed.items) &&
        typeof parsed.totalQuantity === "number"
      ) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error al leer el carrito del localStorage", e);
  }
  return { items: [], totalQuantity: 0 };
};

const initialState: CartState = loadCartFromStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantityInCart++;
      } else {
        state.items.push({ ...product, quantityInCart: 1 });
      }
      state.totalQuantity++;
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantityInCart++;
        state.totalQuantity++;
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantityInCart > 0) {
        item.quantityInCart--;
        state.totalQuantity--;
        if (item.quantityInCart === 0) {
          state.items = state.items.filter((i) => i.id !== item.id);
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
    replaceCart(state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
