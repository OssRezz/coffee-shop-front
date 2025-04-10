import reducer, {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  cartSlice,
} from "../cartSlice";

const product = {
  id: 1,
  name: "Café Especial",
  price: 12000,
  quantity: 100,
};

describe("cartSlice", () => {
  it("agrega un producto nuevo al carrito", () => {
    const state = reducer(undefined, addToCart(product));
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantityInCart).toBe(1);
    expect(state.totalQuantity).toBe(1);
  });

  it("incrementa cantidad si el producto ya existe", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, addToCart(product));
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantityInCart).toBe(2);
    expect(state.totalQuantity).toBe(2);
  });

  it("incrementa correctamente con incrementQuantity", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, incrementQuantity(product.id));
    expect(state.items[0].quantityInCart).toBe(2);
    expect(state.totalQuantity).toBe(2);
  });

  it("decrementa cantidad y elimina producto si llega a 0", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, decrementQuantity(product.id));
    expect(state.items.length).toBe(0);
    expect(state.totalQuantity).toBe(0);
  });

  it("limpia el carrito con clearCart", () => {
    let state = reducer(undefined, addToCart(product));
    state = reducer(state, clearCart());
    expect(state.items.length).toBe(0);
    expect(state.totalQuantity).toBe(0);
  });

  it("reemplaza el carrito con replaceCart", () => {
    const newCart = {
      items: [{ ...product, quantityInCart: 3 }],
      totalQuantity: 3,
    };
    const state = reducer(undefined, cartSlice.actions.replaceCart(newCart));
    expect(state).toEqual(newCart);
  });
});
