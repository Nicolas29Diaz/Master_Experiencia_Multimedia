import React from "react";
import {
  DashboardContainer,
  HeaderContainer,
  TitleHeader,
  ContainerButton,
} from "./styles";
import Banner from "Components/Banner";
import Button from "Components/Button";
import { useHistory } from "react-router";
const Dashboard = ({
  children,
  banner,
  titleHeader,
  textButton,
  onClick = {},
  backButton,
}) => {
  const history = useHistory();
  return (
    <>
      <DashboardContainer>
        {backButton && (
          <Button
            type="button"
            styleButton="secondary"
            onClick={() => history.push(backButton)}
          >
            Volver
          </Button>
        )}

        <HeaderContainer>
          {banner && <Banner banner={banner} />}

          <ContainerButton>
            <TitleHeader>{titleHeader}</TitleHeader>
            {textButton && (
              <Button type="button" styleButton="secondary" onClick={onClick}>
                {textButton}
              </Button>
            )}
          </ContainerButton>
        </HeaderContainer>
        {children}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
