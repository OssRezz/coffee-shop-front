import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ShoppingBasket } from "lucide-react";

export const CartButton = () => {
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  return (
    <div className="d-flex align-items-center order-lg-2 ms-auto">
      <button
        className="btn position-relative"
        data-bs-toggle="offcanvas"
        data-bs-target="#cartOffcanvas"
      >
        <ShoppingBasket />
        {totalQuantity > 0 && (
          <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
            {totalQuantity}
          </span>
        )}
      </button>
    </div>
  );
};
