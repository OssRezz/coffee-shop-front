import "./CreditCardPreview.css";
import visaLogo from "../../../../assets/images/cards/visa.svg";
import mastercardLogo from "../../../../assets/images/cards/mastercard.svg";
import amexLogo from "../../../../assets/images/cards/amex.svg";
import defaultLogo from "../../../../assets/images/cards/generic.svg";
import cardValidator from "card-validator";

interface Props {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focused?: string;
}

const CreditCardPreview = ({ number, name, expiry, cvc, focused }: Props) => {
  const cardData = cardValidator.number(number);
  const cardType = cardData.card?.type;

  console.log(focused);
  const getLogo = () => {
    switch (cardType) {
      case "visa":
        return visaLogo;
      case "mastercard":
        return mastercardLogo;
      case "american-express":
      case "amex":
        return amexLogo;
      default:
        return defaultLogo;
    }
  };

  const formatNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, "");
    if (cardType === "american-express" || cardType === "amex") {
      return cleaned.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3").trim();
    }
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  };

  return (
    <div className="credit-card-preview shadow rounded p-4  bg-gradient position-relative">
      <div className="d-flex justify-content-between mb-3">
        <span className="text-uppercase">Credit Card</span>
        <img src={getLogo()} alt="Card Logo" height={24} />
      </div>

      <div
        className={`fs-5  ${focused === "number" ? "fw-bold" : "opacity-75"}`}
      >
        {formatNumber(number) || "•••• •••• •••• ••••"}
      </div>

      <div className="d-flex justify-content-between mt-3">
        <div>
          <small className="text-uppercase">Card Holder</small>
          <div className={`${focused === "name" ? "fw-bold" : "opacity-75"}`}>
            {name || "FULL NAME"}
          </div>
        </div>
        <div>
          <small className="text-uppercase">Expires</small>
          <div className={`${focused === "expiry" ? "fw-bold" : "opacity-75"}`}>
            {expiry || "MM/YY"}
          </div>
        </div>
      </div>

      <div className="position-absolute bottom-0 end-0 p-2 text-end">
        <small className="text-muted">
          CVC: {focused === "cvc" ? cvc || "•••" : "•••"}
        </small>
      </div>
    </div>
  );
};

export default CreditCardPreview;
