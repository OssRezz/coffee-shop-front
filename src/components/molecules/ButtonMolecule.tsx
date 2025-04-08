import PropTypes from "prop-types";

const ButtonMolecule = ({
  type = "button",
  className = "",
  onClick,
  children,
  disabled = false,
}: any) => {
  return (
    <button
      type={type}
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

ButtonMolecule.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonMolecule;
