import styled, { keyframes } from "styled-components";
import { Colors } from "styles/GlobalStyles";

const spin = keyframes`
0%{
    transform:rotate(0deg)
}

100%{
   transform:rotate(360deg)
}
`;

export const StyleSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: ${Colors.primary};

  animation: ${spin} 1s ease infinite;
`;
