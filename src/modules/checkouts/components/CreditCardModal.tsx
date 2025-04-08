import { Modal } from "react-bootstrap";
import ButtonMolecule from "../../../components/molecules/ButtonMolecule";
const CreditCardModal = ({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title>Pay with credit card</Modal.Title>
      </Modal.Header>
      <Modal.Body>modal</Modal.Body>
      <Modal.Footer className="border-top-0">
        <ButtonMolecule
          className="button button-outline-blue font-16 fw-medium"
          onClick={handleClose}
        >
          Cancel
        </ButtonMolecule>

        <ButtonMolecule
          className="button button-blue font-16 fw-medium"
          onClick={() => {
            handleClose();
          }}
        >
          Confirm
        </ButtonMolecule>
      </Modal.Footer>
    </Modal>
  );
};

export default CreditCardModal;
