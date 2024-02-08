import React from "react";
import { ButtonForm } from "./styles";
import PropTypes from "prop-types";

const Button = ({
  type,
  children,
  styleButton,
  onClick,
  disabled,
  ...buttonProps
}) => {
  return (
    <ButtonForm
      type={!type ? "button" : type}
      styleButton={styleButton}
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </ButtonForm>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  styleButton: PropTypes.string.isRequired,
};

export default Button;
