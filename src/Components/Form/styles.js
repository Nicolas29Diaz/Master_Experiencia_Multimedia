import styled from "styled-components";
import { Colors } from "styles/GlobalStyles";

export const FormStyle = styled.form`
  margin: 4rem;
`;

export const Title = styled.h2`
  margin: 1rem 0.5rem;
  font-weight: 700;
  font-family: "Lato";
`;

export const Row = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 21px;
  margin: 1.25rem 0;

  &::after {
    content: "";
    width: ${({ group }) => (group ? "100%" : "")};
    border-bottom: ${({ group }) =>
      group ? "0.5px solid rgba(000,000,000,.1)" : ""};
  }
`;

export const WrapperRadio = styled.div`
  width: 30rem;
  display: flex;
  font-family: "Raleway";
  font-style: normal;
  position: relative;
`;

export const ButtonActions = styled.div`
  margin: 4.625rem 0 0 0;
  & > button {
    margin: 0 0.3rem 0 0;
  }
`;

export const ErrorMessage = styled.small`
  bottom: -16px;
  color: ${Colors.error};
  font-family: "Raleway";
  font-weight: 700;
  position: absolute;
  white-space: nowrap;
  font-size: 11px;
`;
