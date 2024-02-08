import React, { forwardRef } from "react";
import { ContainerField, ErrorMessage } from "./styles";
// import PropTypes from "prop-types";
const TextField = (
  {
    type,
    name,
    placeholder,
    value,
    onChange,
    width,
    error,
    maxLength,
    isWithButton,
  },
  ref
) => {
  const blockInvalidChar = (e) =>
    type === "number" &&
    ["e", "E", "+", "-"].includes(e.key) &&
    e.preventDefault();

  const blockUpAndDownArrows = (e) => {
    type === "number" &&
      (e.keyCode === 38 || e.keyCode === 40) &&
      e.preventDefault();
  };

  return (
    <>
      <ContainerField width={width} error={error} isWithButton={isWithButton}>
        <input
          className="formInput"
          type={type}
          name={name}
          placeholder=" "
          value={value}
          onChange={onChange}
          ref={ref}
          maxLength={maxLength}
          onKeyPress={blockInvalidChar}
          onKeyDown={blockUpAndDownArrows}
        />
        <label className="label">{placeholder}</label>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </ContainerField>
    </>
  );
};

const refTextField = forwardRef(TextField);

// TextField.propTypes = {
//   type: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default refTextField;
