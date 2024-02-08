import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";
import { animated } from "react-spring";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const Content = styled(animated.div)`
  background-color: ${Colors.white};
  border-radius: 1.25rem;
  font-family: Lato;
  max-width: 700px;
  padding: 1.25rem;
  position: relative;
  width: 100%;

  & p {
    margin: 20px 0;
    font-family: Raleway;
  }
`;
