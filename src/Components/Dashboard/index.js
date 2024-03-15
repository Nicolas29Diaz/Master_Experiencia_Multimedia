import React from "react";
import {
  DashboardContainer,
  HeaderContainer,
  TitleHeader,
  ContainerButton,
  ContainerTittleButtons,
} from "./styles";
import Banner from "Components/Banner";
import Button from "Components/Button";
import { useHistory } from "react-router";
const Dashboard = ({
  children,
  banner,
  titleHeader,
  backButton,
  buttons = [],
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

          <ContainerTittleButtons>
            <TitleHeader>{titleHeader}</TitleHeader>
            {
              buttons.length > 0 && (
                <ContainerButton>
                  {buttons.map((item, index) => (
                    <Button
                      key={index}
                      type="button"
                      styleButton={item.style}
                      onClick={item.action}
                    >
                      {item.text}
                    </Button>
                  ))}
                </ContainerButton>
              )

              // <ContainerButton>
              //   <Button type="button" styleButton="secondary" onClick={onClick}>
              //     {textButton}
              //   </Button>
              //   <Button type="button" styleButton="secondary" onClick={onClick}>
              //     {textButton}
              //   </Button>
              // </ContainerButton>
            }
          </ContainerTittleButtons>
        </HeaderContainer>
        {children}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
