import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const ContainerTextArea = styled.div`
  position: relative;
  font-family: "Raleway";
  width: 46.8rem;
  textarea {
    width: 100%;
    height: 6.1875rem;
    resize: none;
    border-radius: 0.5rem;
    border: 1px solid ${Colors.default};
    margin: 1.25rem 0;
    padding: 0.6rem 0.5rem;
    outline: none;
    font-family: "Raleway";
  }

  textarea + label {
    color: ${Colors.focus};
    font-size: 12px;
    left: 0.3rem;
    top: 0.85rem;
    z-index: 10;
  }

  label {
    position: absolute;
    background-color: #fff;
    top: 1.5rem;
    left: 0.3rem;
    font-size: 14px;
    padding: 0 0.25rem;
    transition: 0.3s;
    color: #aaa;
  }
  .formTextArea + label {
    color: ${({ error }) => (error ? Colors.error : Colors.focus)};
  }

  .formTextArea:not(:placeholder-shown).formTextArea:not(:focus) + label {
    color: ${Colors.focus};
    font-size: 12px;
    left: 0.3rem;
    top: 0.85rem;
    z-index: 10;
  }

  .formTextArea:not(:placeholder-shown).formTextArea:not(:focus) {
    border: 1.5px solid ${Colors.focus};
  }

  /*Input focus*/
  .formTextArea:focus {
    border: ${({ error }) =>
      error ? `1.5px solid ${Colors.error}` : `1.5px solid ${Colors.focus}`};
  }
`;

export const ErrorMessage = styled.small`
  bottom: 0;
  left: 0;
  color: ${Colors.error};
  font-family: "Raleway";
  font-size: 10px;
  font-weight: 700;
  position: absolute;
`;
