import styled from "styled-components";
import { breakPoints, Colors, scrollBarStyle } from "styles/GlobalStyles";

export const ExtraInfoContainer = styled.section`
  background-color: ${Colors.white};
  width: 15rem;
  margin-top: 15px;
  border-radius: 10px;
  height: 115px;
  overflow-y: auto;
  ${scrollBarStyle}

  ${breakPoints.tablet} {
    height: 106px;
    margin-top: 0;
  }

  p {
    color: ${Colors.default};
    font-size: 18px;
  }
`;

export const InfoContainer = styled.div`
  margin: 0 2rem;
`;

export const TitleInfo = styled.h3`
  margin: 5px 0;
  padding-top: 10px;
`;
