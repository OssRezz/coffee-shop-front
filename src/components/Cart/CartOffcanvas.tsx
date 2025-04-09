import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { incrementQuantity, decrementQuantity } from "../../store/cartSlice";
import CoffeeShopLogo from "./../../assets/images/logo_coffee_shop.png";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export const CartOffcanvas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantityInCart,
    0
  );

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="cartOffcanvas"
      aria-labelledby="cartOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartOffcanvasLabel">
          Shopping Cart
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column h-100">
        {cart.length === 0 ? (
          <p className="text-muted">Your Cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center mb-3 border-bottom pb-2"
              >
                <img
                  className="img-cart"
                  src={
                    item.image
                      ? `${
                          import.meta.env.VITE_API_BASE_URL
                        }/uploads/products/${item.image}`
                      : CoffeeShopLogo
                  }
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = CoffeeShopLogo)}
                />
                <div className="ms-3 flex-grow-1">
                  <p className="mb-1 fw-semibold">{item.name}</p>
                  <small>${item.price / 100}</small>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantityInCart}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-auto border-top pt-3">
              <div className="col-12 d-flex justify-content-between">
                <h6>Total:</h6>
                <h6> ${total / 100}</h6>
              </div>
              <button
                type="button"
                className="btn btn-warning w-100 mt-2"
                data-bs-dismiss="offcanvas"
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
