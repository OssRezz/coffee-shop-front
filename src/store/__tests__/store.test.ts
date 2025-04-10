import { store } from "../index";
import { addToCart, clearCart } from "../cartSlice";

describe("store - persistencia en localStorage", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "setItem");
    localStorage.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("guarda en localStorage cuando se agrega al carrito", () => {
    const product = {
      id: 1,
      name: "Café Premium",
      price: 15000,
      quantity: 10,
    };

    store.dispatch(addToCart(product));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.stringContaining('"totalQuantity":1')
    );
  });

  it("guarda en localStorage cuando se limpia el carrito", () => {
    store.dispatch(clearCart());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify({
        items: [],
        totalQuantity: 0,
      })
    );
  });
});
