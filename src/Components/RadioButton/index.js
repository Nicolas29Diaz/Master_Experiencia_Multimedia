import React, { forwardRef } from "react";
import { ContainerRadio, Radio } from "./styles";
// import PropTypes from "prop-types";

const RadioButton = (
  { id, text, name, value, onChange, checked, error, defaultValue, ...props },
  ref
) => {
  return (
    <ContainerRadio error={error}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
        defaultValue={defaultValue}
        ref={ref}
        {...props}
      />
      <Radio error={error} />

      <label htmlFor={id}>{text}</label>
    </ContainerRadio>
  );
};

const refRadioButton = forwardRef(RadioButton);

// RadioButton.propTypes = {
//   id: PropTypes.oneOfType([
//     PropTypes.string.isRequired,
//     PropTypes.number.isRequired,
//   ]),
//   text: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   checked: PropTypes.bool.isRequired,
// };

export default refRadioButton;
