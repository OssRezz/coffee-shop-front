import { MapPin, ReceiptText } from "lucide-react";
import { Modal } from "react-bootstrap";
import { JellyTriangle } from "@uiball/loaders";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productAmount: number;
  baseFee?: number;
  deliveryFee?: number;
  loading?: boolean;
}

const PaymentSummaryBackdrop = ({
  show,
  onClose,
  onConfirm,
  productAmount,
  baseFee = 100,
  deliveryFee = 250,
  loading = false,
}: Props) => {
  const total = productAmount + baseFee + deliveryFee;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title>Payment Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12 col-lg-8 mb-4">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="col-12 mb-4">
                  <h6>Facturación</h6>
                </div>
                <div className="col-12">
                  <div className="row d-flex align-items-center">
                    <div className="col-auto">
                      <ReceiptText size={40} />
                    </div>
                    <div className="col-auto">
                      <div className="col-12">James Osorio Florez</div>
                      <div className="col-12">1036957215</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="col-12 mb-4">
                  <h6>Detalle de la entrega</h6>
                </div>
                <div className="col-12">
                  <div className="row d-flex align-items-center">
                    <div className="col-auto">
                      <MapPin size={40} />
                    </div>
                    <div className="col-auto">
                      <div className="col-12">Carrera 46 # 32-32</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="d-lg-none" />
          <div className="col-12 col-lg-4">
            <div className="d-flex justify-content-between mb-2">
              <span>Product Total:</span>
              <strong>${productAmount / 100}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Base Fee:</span>
              <strong>${baseFee / 100}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Fee:</span>
              <strong>${deliveryFee / 100}</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total:</span>
              <strong>${total / 100}</strong>
            </div>
          </div>

          {loading && (
            <div className="col-12">
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ minHeight: "20vh" }}
              >
                <JellyTriangle size={60} speed={1.3} color="#212529" />
                <p className="mt-3 fw-semibold">Processing payment...</p>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={onConfirm}
          disabled={loading}
        >
          Confirm Payment
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentSummaryBackdrop;
