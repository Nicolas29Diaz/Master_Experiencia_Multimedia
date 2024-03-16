import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  padding-top: 10px;
`;

export const ContainerTittleButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 645px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TitleHeader = styled.h1`
  margin: 10px 0;
  font-family: Lato;
`;
