import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import cardValidator from "card-validator";
import { useEffect, useState } from "react";
import CreditCardPreview from "./CreditCardPreview/CreditCardPreview";
import { CreditCardValues } from "../interfaces/credit-card-values";

interface Props {
  show: boolean;
  handleClose: () => void;
  onSubmitSuccess: (data: CreditCardValues) => void;
}

const CreditCardModal = ({ show, handleClose, onSubmitSuccess }: Props) => {
  const [focus, setFocus] = useState<keyof CreditCardValues | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<CreditCardValues>({
    defaultValues: {
      name: "",
      document_number: "",
      cellphone: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  useEffect(() => {
    if (!show) {
      reset();
      setFocus("");
    }
  }, [show, reset]);

  const onSubmit = (data: CreditCardValues) => {
    const cardInfo = cardValidator.number(data.cardNumber);
    const cardType = cardInfo.card?.type;
    const cvcLength = cardType === "american-express" ? 4 : 3;

    const numberValid = cardInfo.isValid;
    const expiryValid = cardValidator.expirationDate(data.expiry).isValid;
    const cvcValid = cardValidator.cvv(data.cvc, cvcLength).isValid;

    if (!numberValid || !expiryValid || !cvcValid) {
      alert("Tarjeta inválida. Verifica los datos.");
      return;
    }

    onSubmitSuccess(data);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    const [monthStr] = value.split("/");
    if (monthStr && parseInt(monthStr) > 12) {
      return;
    }

    setValue("expiry", value);
    trigger("expiry");
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title>Pay with credit card</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-md-12 d-flex justify-content-center mb-3">
              <CreditCardPreview
                number={watch("cardNumber")}
                name={watch("name")}
                expiry={watch("expiry")}
                cvc={watch("cvc")}
                focused={focus}
              />
            </div>

            {/* Campos de formulario */}
            <div className="col-12 col-lg-6">
              <label className="form-label">
                Name <b className="text-danger">*</b>
              </label>
              <input
                {...register("name", {
                  required: "The name is required",
                  minLength: {
                    value: 6,
                    message: "The name must be at least 6 characters",
                  },
                })}
                className="form-control"
                placeholder="Name"
                onFocus={() => setFocus("name")}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>

            <div className="col-12 col-lg-6">
              <label className="form-label">
                Card number <b className="text-danger">*</b>
              </label>
              <input
                {...register("cardNumber", {
                  required: "The card number is required",
                  validate: (value) =>
                    cardValidator.number(value).isValid ||
                    "Invalid card number",
                })}
                className="form-control"
                placeholder="Card number"
                maxLength={19}
                onFocus={() => setFocus("cardNumber")}
              />
              {errors.cardNumber && (
                <p className="text-danger">{errors.cardNumber.message}</p>
              )}
            </div>

            <div className="col-12 col-lg-6">
              <label className="form-label">
                Expiration date <b className="text-danger">*</b>
              </label>
              <input
                {...register("expiry", {
                  required: "The expiration date is required",
                  validate: (value) => {
                    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                    if (!regex.test(value)) return "Invalid format";

                    const [monthStr, yearStr] = value.split("/");
                    const month = parseInt(monthStr);
                    const year = parseInt(yearStr);
                    const now = new Date();
                    const currentMonth = now.getMonth() + 1;
                    const currentYear = now.getFullYear() % 100;

                    if (year < currentYear) return "Expired year";
                    if (year === currentYear && month < currentMonth)
                      return "Expired month";

                    return true;
                  },
                })}
                className="form-control"
                placeholder="MM/YY"
                maxLength={5}
                onFocus={() => setFocus("expiry")}
                onChange={handleExpiryChange}
              />
              {errors.expiry && (
                <p className="text-danger">{errors.expiry.message}</p>
              )}
            </div>

            <div className="col-12 col-lg-6">
              <label className="form-label">
                CVC <b className="text-danger">*</b>
              </label>
              <input
                {...register("cvc", {
                  required: "The CVC is required",
                  validate: (value) => {
                    const cardType = cardValidator.number(watch("cardNumber"))
                      .card?.type;
                    const expectedLength =
                      cardType === "american-express" ? 4 : 3;
                    return (
                      cardValidator.cvv(value, expectedLength).isValid ||
                      "Invalid CVC"
                    );
                  },
                })}
                className="form-control"
                placeholder="CVC"
                maxLength={4}
                onFocus={() => setFocus("cvc")}
                type="number"
              />
              {errors.cvc && (
                <p className="text-danger">{errors.cvc.message}</p>
              )}
            </div>

            <div className="col-12 col-lg-6">
              <label className="form-label">
                Document number <b className="text-danger">*</b>
              </label>
              <input
                {...register("document_number", {
                  required: "The document is required",
                  minLength: {
                    value: 7,
                    message: "The document must be at least 7 characters",
                  },
                })}
                className="form-control"
                placeholder="Identification"
                type="number"
              />
              {errors.document_number && (
                <p className="text-danger">{errors.document_number.message}</p>
              )}
            </div>

            <div className="col-12 col-lg-6">
              <label className="form-label">
                Phone <b className="text-danger">*</b>
              </label>
              <input
                {...register("cellphone", {
                  required: "The phone is required",
                  minLength: {
                    value: 10,
                    message: "The phone must be at least 10 characters",
                  },
                })}
                className="form-control"
                placeholder="Phone"
                type="number"
              />
              {errors.cellphone && (
                <p className="text-danger">{errors.cellphone.message}</p>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">
                Address <b className="text-danger">*</b>
              </label>
              <textarea
                {...register("address", {
                  required: "The address is required",
                })}
                className="form-control"
                rows={3}
              />
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-top-0">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button className="btn btn-dark" type="submit">
            Confirm
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreditCardModal;
