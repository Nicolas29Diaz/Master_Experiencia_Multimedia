import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const WrapperCardGroup = styled.div`
  width: fit-content;
  border: 2px solid ${Colors.primary};
  border-radius: 10px;
  margin-bottom: 10px;
  max-width: 100%;
`;

export const CardGroupHeader = styled.div`
  background-color: ${Colors.primary};
  display: flex;
  justify-content: space-between;
  color: ${Colors.white};
  padding: 10px 0;
  border-radius: 5px 5px 0 0;

  & h2 {
    margin: 0 0 0 10px;
  }

  & svg {
    margin: 0 10px 0 0;
  }
`;

export const CardGroupList = styled.div`
  width: 100%;
  display: flex;
  flex-basis: 10;
  flex-wrap: wrap;
`;
