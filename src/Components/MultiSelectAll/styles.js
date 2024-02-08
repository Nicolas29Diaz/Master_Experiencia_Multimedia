import styled, { css } from "styled-components";
import { Colors } from "styles/GlobalStyles";
import Select from "react-select";
import AsyncSelect from "react-select/async";

export const ErrorMessage = styled.small`
  font-family: Raleway;
  bottom: -16px;
  color: ${Colors.error};
  position: absolute;
  font-weight: 700;
  font-size: 11px;
`;

const labelStyles = css`
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
`;

export const Wrapper = styled.div`
  position: relative;

  .label {
    ${labelStyles}
  }

  .label2 {
    ${labelStyles}
  }
`;

export const StyleSelect = styled(Select)`
  ${({ isFocused }) =>
    isFocused &&
    css`
      & + .label {
        color: ${({ error }) => (error ? Colors.error : Colors.focus)};
        font-size: 12px;
        left: 0.3rem;
        top: -0.5rem;
        z-index: 10;
        max-width: 100%;
      }
    `}
`;

export const StyleSelectAsync = styled(AsyncSelect)`
  ${({ isFocused }) =>
    isFocused &&
    css`
      & + .label {
        color: ${({ error }) => (error ? Colors.error : Colors.focus)};
        font-size: 12px;
        left: 0.3rem;
        top: -0.5rem;
        z-index: 10;
        max-width: 100%;
      }
    `}
`;
