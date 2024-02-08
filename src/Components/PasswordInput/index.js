import React, { forwardRef } from "react";
import TextField from "Components/TextField";
import { ButtonShow, ContainerPassword } from "./styles";
const PasswordInput = (
  {
    name,
    value,
    onChange,
    width,
    error,
    maxLength,
    onShowButton,
    showButton,
    isWithButton,
  },
  ref
) => {
  return (
    <ContainerPassword>
      <TextField
        type={showButton ? "text" : "password"}
        name={name}
        placeholder="Contraseña"
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        width={width}
        error={error}
        ref={ref}
        isWithButton={isWithButton}
      />
      <ButtonShow type="button" onClick={onShowButton}>
        {showButton ? "Ocultar" : "Mostrar"}
      </ButtonShow>
    </ContainerPassword>
  );
};

export default forwardRef(PasswordInput);
