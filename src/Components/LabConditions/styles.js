import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const PageContainer = styled.div`
  width: 100%;
`;
export const Features = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const FeatureContainer = styled.div`
  display: flex;
  margin: 0.9375rem 0.625rem;

  :nth-child(2) {
    margin-left: 2.5625rem;
  }
`;

export const ImageContainer = styled.div`
  width: 2.5625rem;
  height: 2.5625rem;
  border-radius: 50%;
  background-color: ${Colors.black};
  text-align: center;

  svg {
    width: 1.875rem;
    height: 2.5rem;
  }
`;
export const TextContainer = styled.div`
  margin: 0 5px;

  strong {
    text-transform: capitalize;
    font-size: 1.8rem;
    font-family: Lato;
  }
`;

export const PageActions = styled.div`
  margin: 1.25rem 0;
`;

export const ContainerAnswerPractice = styled.div`
  display: flex;
  gap: 1.375rem;
  margin: 1.25rem 0;
`;

export const RowForm = styled.div`
  display: flex;
  gap: 1.25rem;
`;
