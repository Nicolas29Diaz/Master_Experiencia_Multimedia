import styled from "styled-components";

export const FieldModal = styled.div`
  margin: 2rem 0;
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1.875rem 0 0.625rem 0;

  & > button {
    margin-left: 14px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0px;
  @media (max-width: 600px) {
    flex-direction: column; /* Cambia la dirección del flexbox a columna */
    align-items: center; /* Centra los elementos */
    gap:10px;
  }
`;
