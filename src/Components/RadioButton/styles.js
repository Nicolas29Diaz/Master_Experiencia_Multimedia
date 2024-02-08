import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const ContainerRadio = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0.5rem 0 0;
  font-family: "Raleway";

  input {
    display: none;

    &:checked + div:after {
      transform: scale(1);
    }
  }

  label {
    cursor: pointer;
    user-select: none;
    color: ${({ error }) => (error ? Colors.error : "")};
  }
`;

export const Radio = styled.div`
  width: 1rem;
  height: 1rem;
  border: ${({ error }) =>
    error ? `2px solid ${Colors.error}` : `2px solid ${Colors.focus}`};
  border-radius: 50%;
  margin: 0 10px;
  box-sizing: border-box;
  padding: 2px;

  ::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background-color: ${Colors.focus};
    border-radius: 50%;

    transform: scale(0);
  }
`;
