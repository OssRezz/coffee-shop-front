import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { incrementQuantity, decrementQuantity } from "../../store/cartSlice";
import CoffeeShopLogo from "./../../assets/images/logo_coffee_shop.png";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import CreditCardModal from "../../modules/checkouts/components/CreditCardModal";

const CheckOutPage = () => {
  const [show, setShow] = useState(false);

  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantityInCart,
    0
  );

  return (
    <div className="row  d-flex justify-content-center">
      <div className="col-12">
        <h1>Checkout</h1>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
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

                <div className="mt-auto  pt-3 text-end">
                  <div className="col-12 d-flex justify-content-end">
                    <h6 className="me-2">Total:</h6>
                    <h6> ${total / 100}</h6>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark mt-2"
                    onClick={handleShow}
                  >
                    <CreditCard className="me-2" />
                    Pay with credit card
                  </button>
                </div>

                <CreditCardModal show={show} handleClose={handleClose} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
