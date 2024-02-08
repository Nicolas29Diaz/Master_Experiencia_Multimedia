import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";
export const StudentPracticesContainer = styled.main`
  width: 100%;
  display: ${({ practicesStudent }) =>
    practicesStudent.length > 0 ? "flex" : ""};
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  height: 100%;
`;

export const CardContainer = styled.article`
  width: 244px;
  height: 320px;
  background-color: ${Colors.white};
  border-radius: 20px;
  border: 2px solid ${Colors.default};
  margin-top: 1rem;
  position: relative;
  :hover {
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
      0 2px 6px 2px rgb(60 64 67 / 15%);
  }
`;

export const BackgrounImage = styled.div`
  width: 100%;
  height: 40%;
  background-color: ${Colors.primary};
  border-radius: 20px 20px 0 0;
  text-align: center;

  svg {
    width: 3.5rem;
    height: 100%;
  }
`;
export const CardInfo = styled.div`
  padding: 0.5rem;
  overflow: hidden;
  max-width: 300px;
  overflow-wrap: break-word;

  h1 {
    font-size: 20px;
  }

  p {
    padding: 0.25rem 0;
  }
`;

export const StateCard = styled.span`
  color: ${({ estado }) =>
    estado === "Realizada" ? Colors.primary : Colors.secondary};
`;

export const ActionButtonContainer = styled.div`
  margin: 2rem 0;
  position: absolute;
  bottom: -20px;
  left: 5px;
`;
