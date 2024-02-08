import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const BannerContainer = styled.div`
  width: 100%;
  background-color: ${Colors.primary};
  color: ${Colors.white};
  padding: 1.25rem 0;
  border-radius: 0.625rem;
  font-family: Lato;

  & p,
  & small {
    margin: 0.1875rem 0;
    font-family: Raleway;
  }
`;

export const Content = styled.div`
  margin: 0 1.25rem;
`;

export const ItemBanner = styled.li`
  padding: 0.2rem 0;

  font-weight: bold;

  span {
    font-weight: normal;
  }
`;
