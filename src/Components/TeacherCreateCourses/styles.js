import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 8rem;

  h2 {
    font-size: 20px;
    margin: 5px 0;
  }
`;

export const ContainerImage = styled.div`
  width: 20%;

  img {
    width: 100%;
  }
`;
