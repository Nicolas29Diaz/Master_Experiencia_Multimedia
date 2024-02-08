import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const ContainerField = styled.div`
  position: relative;
  height: 2.8125rem;
  width: ${({ width }) => (width ? width : "15.125rem")};
  .formInput {
    display: inline-block;
    background: none;
    border-radius: 0.5rem;
    border: ${({ error }) =>
      error ? `1px solid ${Colors.error}` : `1px solid ${Colors.default}`};
    font-family: "Raleway";
    font-size: 14px;
    height: 100%;
    left: 0;
    outline: none;
    padding-left: 0.6rem;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .label {
    background-color: ${Colors.white};
    color: ${({ error }) => (error ? Colors.error : Colors.default)};
    font-size: 14px;
    left: 0.3rem;
    padding: 0 0.25rem;
    position: absolute;
    top: 1rem;
    transition: 0.3s;
    font-family: "Raleway";
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 75%;
  }

  /*Input focus move up label*/
  .formInput + label {
    color: ${({ error }) => (error ? Colors.error : Colors.focus)};
    font-size: 12px;
    left: 0.3rem;
    top: -0.5rem;
    z-index: 10;
    max-width: 100%;
  }

  /*Input focus sticky top label*/
  .formInput:not(:placeholder-shown).formInput:not(:focus) + label {
    color: ${Colors.focus};
    font-size: 12px;
    left: 0.3rem;
    top: -0.5rem;
    z-index: 10;
  }

  .formInput:not(:placeholder-shown).formInput:not(:focus) {
    border: 1.5px solid ${Colors.focus};
  }

  /*Input focus*/
  .formInput:focus {
    border: ${({ error }) =>
      error ? `1.5px solid ${Colors.error}` : `1.5px solid ${Colors.focus}`};
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input {
    padding-right: ${({ isWithButton }) => (isWithButton ? "80px" : 0)};
  }
`;

export const ErrorMessage = styled.small`
  bottom: -16px;
  color: ${Colors.error};
  font-family: "Raleway";
  font-size: 10px;
  font-weight: 700;
  position: absolute;
`;
