import React, { forwardRef } from "react";
import { ContainerTextArea, ErrorMessage } from "./styles";
// import PropTypes from "prop-types";

const TextArea = ({ name, value, onChange, placeholder, error }, ref) => {
  return (
    <ContainerTextArea error={error}>
      <textarea
        className="formTextArea"
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        ref={ref}
      />
      <label>{placeholder}</label>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </ContainerTextArea>
  );
};

const refTextArea = forwardRef(TextArea);

// TextArea.propTypes = {
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default refTextArea;
