import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

const STYLES = {
  primary: {
    background: Colors.primary,
    border: "none",
    color: "#f5f5f5",
  },

  secondary: {
    background: "none",
    border: `2px solid ${Colors.secondary}`,
    color: Colors.secondary,
  },

  delete: {
    background: "none",
    border: `2px solid ${Colors.delete}`,
    color: Colors.delete,
  },
};

const getStyleButton = (props) => {
  const style = STYLES[props.styleButton];
  if (!style) {
    console.warn(
      `[Button Styled Component] This styles doesnt exist. Use ${Object.keys(
        STYLES
      ).join(", ")}`
    );
    return STYLES.primary;
  }
  return style;
};

export const ButtonForm = styled.button`
  ${getStyleButton}
  border-radius: 3.75rem;
  cursor: pointer;
  display: inline-block;
  height: 2.5rem;
  outline: none;
  transition: 0.2s;
  font-size: 1.125rem;
  min-width: 10rem;
  padding: 0 0.625rem;

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  :hover {
    background-color: ${({ styleButton }) =>
      styleButton === "primary"
        ? "#283b4b"
        : styleButton === "delete"
        ? Colors.delete
        : Colors.secondary};
    color: #fff;
  }
`;
