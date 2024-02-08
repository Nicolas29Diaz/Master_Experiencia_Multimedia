import React, { useEffect } from "react";
import Button from "Components/Button";
import useStudent from "hooks/useStudent";
import { CORTE2, EXTRA_INFO_SHOW } from "constants/index";
import { ExtraInfoContainer, InfoContainer, TitleInfo } from "./styles";

const StudentExtraInfo = () => {
  const { modulo, getGraphics, idPractica, graphics } = useStudent();

  useEffect(() => {
    if (modulo === CORTE2) getGraphics(idPractica);
  }, [modulo, idPractica, getGraphics]);

  const selectedInfotoShow = EXTRA_INFO_SHOW[modulo];

  const infoGraphics = () => (
    <>
      <TitleInfo>Graficos a realizar</TitleInfo>
      <p>{graphics}</p>
    </>
  );

  const infoPractice = () => (
    <>
      <TitleInfo>Formato para la práctica</TitleInfo>
      <Button type="button" styleButton="secondary">
        Descargar
      </Button>
    </>
  );

  return (
    <ExtraInfoContainer>
      <InfoContainer>
        {selectedInfotoShow === "graphics" && infoGraphics()}
        {selectedInfotoShow === "practice" && infoPractice()}
      </InfoContainer>
    </ExtraInfoContainer>
  );
};

export default StudentExtraInfo;
