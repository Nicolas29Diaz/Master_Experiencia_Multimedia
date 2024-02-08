import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const Information = styled.div`
  width: 90%;
  margin-top: 30px;
  height: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Section1 = styled.section`
  height: auto;
  max-height: 125px;
  border-bottom: 1px solid ${Colors.default};
`;

export const Description = styled.section`
  overflow: auto;
  max-height: 90px;
`;

export const Section2 = styled.section`
  padding-top: 10px;
  border-bottom: 1px solid ${Colors.default};
  overflow-y: auto;
`;

export const Section3 = styled.section`
  border-bottom: 1px solid ${Colors.default};
  padding-bottom: 10px;
  height: auto;
`;

export const Section4 = styled.section`
  padding-top: 10px;
`;

export const Section5 = styled.section`
  justify-self: flex-end;
`;

const marginPaddingBottom = 10;

export const Title = styled.h3`
  margin-bottom: ${marginPaddingBottom}px;
`;

export const Text = styled.p`
  margin-bottom: ${marginPaddingBottom}px;
`;

export const FeatureList = styled.ul`
  max-height: 80px;
  overflow-y: auto;
`;

export const FeatureItem = styled.li`
  display: flex;
  width: 100%;
  & span:first-child {
    flex: 0.4;
  }
  & span:last-child {
    flex: 0.9;
  }
`;
export const Item = styled.span`
  margin-bottom: ${marginPaddingBottom}px;
`;

export const ItemName = styled.span`
  text-transform: capitalize;
  margin-bottom: ${marginPaddingBottom}px;
`;

export const ProductsNumber = styled.div`
  display: flex;
`;

export const ExamineNumber = styled.h2`
  margin: 0 0.625rem 0.625rem;
`;
