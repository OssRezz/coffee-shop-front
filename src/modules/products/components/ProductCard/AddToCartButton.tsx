import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../../../store/cartSlice";
import { RootState } from "../../../../store";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    quantity: number;
  };
}

export const AddToCartButton = ({ product }: Props) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantityInCart = cartItem?.quantityInCart || 0;

  if (product.quantity === 0) {
    return (
      <button className="btn btn-secondary w-100 rounded-pill" disabled>
        Sin stock
      </button>
    );
  }

  return quantityInCart > 0 ? (
    <div className="d-flex justify-content-between align-items-center">
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => dispatch(decrementQuantity(product.id))}
      >
        -
      </button>
      <span className="mx-2">{quantityInCart}</span>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => dispatch(incrementQuantity(product.id))}
      >
        +
      </button>
    </div>
  ) : (
    <button
      className="btn btn-dark w-100 rounded-pill"
      onClick={() =>
        dispatch(
          addToCart({
            ...product,
            image: product.image ?? undefined, // null → undefined
          })
        )
      }
    >
      Add to cart
    </button>
  );
};
