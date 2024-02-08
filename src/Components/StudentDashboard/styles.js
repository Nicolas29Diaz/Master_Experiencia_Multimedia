import styled from "styled-components";
import { breakPoints, Colors } from "styles/GlobalStyles";

export const BackgrounContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.default};
`;

export const MainStudent = styled.div`
  display: flex;
  height: 80%;
  width: 90%;
  justify-content: center;
  ${breakPoints.tablet} {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

export const ConfigPractice = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  max-height: 562px;
  width: 15rem;

  ${breakPoints.tablet} {
    flex-direction: row;
    width: 98%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const StudentData = styled.div`
  display: flex;
  background-color: ${Colors.white};
  margin: 0 20px;
  border-radius: 10px;
  max-height: 562px;
  width: 100%;
  max-width: 1000px;
  ${breakPoints.tablet}, ${breakPoints.tableVertical} {
    height: 100%;
    min-width: 800px;
  }
`;

export const Info = styled.div`
  width: 100%;
  max-width: 22rem;

  ${breakPoints.tablet} {
    margin-left: 0.5rem;
  }
`;

export const ProductsDisplay = styled.div`
  margin: 0 40px;
  ${breakPoints.tablet} {
    width: 100%;
  }
`;
