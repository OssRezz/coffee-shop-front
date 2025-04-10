import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../store/cartSlice";
import CoffeeShopLogo from "./../../assets/images/logo_coffee_shop.png";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import CreditCardModal from "../../modules/checkouts/components/CreditCardModal";
import { CreditCardValues } from "../../modules/checkouts/interfaces/credit-card-values";
import PaymentSummaryBackdrop from "../../modules/checkouts/components/PaymentSummaryBackdrop";
import { CheckoutController } from "../../modules/checkouts/controllers/checkout.controller";
import { useNavigate } from "react-router-dom";
import { showErrorAlert } from "../../utils/showErrorAlert";
import { generateRandomEmail } from "../../utils/generateRandomEmail";
import { formatCOP } from "../../utils/formatCOP";

const CheckOutPage = () => {
  const [show, setShow] = useState(false);
  const [cardFormData, setCardFormData] = useState<CreditCardValues | null>(
    null
  );
  const [showSummary, setShowSummary] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantityInCart,
    0
  );
  const baseFee = Math.round(total * 0.1);
  const deliveryFee = 980000;
  const handleCardSubmit = (data: CreditCardValues) => {
    setCardFormData(data);
    setShow(false);
    setShowSummary(true);
  };

  const handleConfirmPayment = async () => {
    if (!cardFormData) {
      console.error("No card data available");
      return;
    }

    setLoadingPayment(true);

    const [expMonth, expYear] = cardFormData.expiry.split("/");

    const products_checkout = cart.map((item) => ({
      productId: Number(item.id),
      quantity: Number(item.quantityInCart),
      price: Number(item.price),
    }));

    const fakeEmail = generateRandomEmail(
      Math.floor(Math.random() * (15 - 8 + 1)) + 8
    );

    const checkout_result = await CheckoutController({
      card: {
        cardNumber: cardFormData.cardNumber,
        cvc: cardFormData.cvc,
        expMonth: expMonth,
        expYear: expYear,
        cardHolder: cardFormData.name,
      },
      amountInCents: total * 100 + baseFee * 100 + deliveryFee,
      currency: "COP",
      installments: 1,
      customer: {
        documentNumber: cardFormData.document_number,
        name: cardFormData.name,
        cellphone: cardFormData.cellphone,
        email: fakeEmail,
        address: cardFormData.address,
      },
      products: products_checkout,
    });

    setLoadingPayment(false);

    if (!checkout_result.success && checkout_result.errors) {
      document.activeElement instanceof HTMLElement &&
        document.activeElement.blur();

      setShowSummary(false);
      showErrorAlert("Payment rejected", checkout_result.errors);

      return;
    }

    if (checkout_result.success && checkout_result.data?.transactionId) {
      const id = checkout_result.data.transactionId;
      dispatch(clearCart());
      localStorage.removeItem("cart");
      navigate(`/transactions/detail/${id}`);
    }
  };

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
                      <small>{formatCOP(item.price)}</small>
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
                    <h6> {formatCOP(total)}</h6>
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

                <CreditCardModal
                  show={show}
                  handleClose={handleClose}
                  onSubmitSuccess={handleCardSubmit}
                />
                <PaymentSummaryBackdrop
                  show={showSummary}
                  onClose={() => setShowSummary(false)}
                  onConfirm={() => {
                    handleConfirmPayment();
                  }}
                  productAmount={total}
                  baseFee={baseFee}
                  deliveryFee={deliveryFee}
                  loading={loadingPayment}
                  cardData={cardFormData}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
