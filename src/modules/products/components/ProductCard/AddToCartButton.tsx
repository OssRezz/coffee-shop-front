import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../../../store/cartSlice";
import { RootState } from "../../../../store";
import { PropsCartButton } from "../../interfaces/props-cart-button";

export const AddToCartButton = ({ product }: PropsCartButton) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantityInCart = cartItem?.quantityInCart || 0;

  if (product.quantity <= 0) {
    return (
      <button className="btn btn-secondary w-100 rounded-pill" disabled>
        Out of stock
      </button>
    );
  }

  return quantityInCart > 0 ? (
    <div className="d-flex justify-content-between align-items-center">
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => {
          dispatch(decrementQuantity(product.id));
          if (quantityInCart === 1) {
            (window as any).dispatchToast?.(
              `${product.name} removed from cart`
            );
          }
        }}
      >
        -
      </button>
      <span className="mx-2">{quantityInCart}</span>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => {
          if (quantityInCart < product.quantity) {
            dispatch(incrementQuantity(product.id));
          } else {
            (window as any).dispatchToast?.(`No more stock available`);
          }
        }}
        disabled={quantityInCart >= product.quantity}
      >
        +
      </button>
    </div>
  ) : (
    <button
      className="btn btn-dark w-100 rounded-pill"
      onClick={() => {
        dispatch(
          addToCart({
            ...product,
            image: product.image ?? undefined,
          })
        );
        (window as any).dispatchToast?.(`${product.name} added to cart`);
      }}
    >
      Add to cart
    </button>
  );
};
