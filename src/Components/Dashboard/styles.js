import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  padding-top: 10px;
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleHeader = styled.h1`
  margin: 28px 0;
  font-family: Lato;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Espacio entre botones */

   @media (max-width: 600px) {
    flex-direction: column; /* Cambia la dirección del flexbox a columna */
    align-items: center; /* Centra los elementos */
  }
`;

// Si solo hay un botón, lo estilizamos para que se posicione a la derecha
export const SingleButtonContainer = styled.div`
  margin-left: auto;
`;

// Componente del botón
export const Button = styled.button`
  /* Estilos de tu botón */
`;
