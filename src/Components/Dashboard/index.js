import React from "react";
import {
  DashboardContainer,
  HeaderContainer,
  TitleHeader,
  ContainerButton,
  ButtonContainer,
} from "./styles";
import Banner from "Components/Banner";
import Button from "Components/Button";
import { useHistory } from "react-router";
const Dashboard = ({
  children,
  banner,
  titleHeader,
  textButton,
  onClick = [],
  backButton,
  resources = false,
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
              <>
                <ButtonContainer>
                  {resources && (
                    <Button
                      type="button"
                      styleButton="secondary"
                      onClick={onClick[1]}
                    >
                      Recursos
                    </Button>
                  )}
                  <Button
                    type="button"
                    styleButton="secondary"
                    onClick={onClick[0]}
                  >
                    {textButton}
                  </Button>
                </ButtonContainer>
              </>
            )}
          </ContainerButton>
        </HeaderContainer>
        {children}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
