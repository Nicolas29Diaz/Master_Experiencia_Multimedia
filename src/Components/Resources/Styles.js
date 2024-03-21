import styled from "styled-components";
import { scrollBarStyle } from "styles/GlobalStyles";
export const DocumentContainer = styled.div`
  max-height: 50vh; /* Altura máxima para el scroll */
  overflow-y: auto; /* Habilitar el scroll vertical */
  margin: 40px auto 0 auto; /* Espacio alrededor del contenedor */
  max-width: 100%;
  border-radius: 10px;
  padding: 0px;
  ${scrollBarStyle} /* Agregar el estilo de la barra de desplazamiento */
`;

export const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; 
  gap: 10px;
`;

export const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vw 2vw;
  background-color: #f9f9f9; /* Color de fondo */
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra */
  min-height:100px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  & > * {
    flex: 1;
  }

`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  background-color: #f9f9f9; /* Color de fondo */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;
