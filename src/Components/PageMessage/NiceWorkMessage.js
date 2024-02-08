import React from "react";
import selected from "assets/character_images/selected.png";

import Button from "Components/Button";
import {
  SummaryPageContainer,
  SummaryContainer,
  SummaryTitle,
  SummaryText,
  SummaryResult,
  SummaryImage,
  SummaryAction,
} from "./styles";
import useStudent from "hooks/useStudent";
import useProduct from "hooks/useProduct";
import { CONSTANT } from "constants/index";
import useProgressBar from "hooks/useProgressBar";
const NiceWork = () => {
  const { changeGraphic, resetSelectedSubgroup } = useStudent();
  const { handleMessageActive, resetReview } = useProduct();
  const { handleStep } = useProgressBar();

  const handleChangeGraphic = () => {
    changeGraphic(CONSTANT);
    handleMessageActive();
    handleStep();
    resetReview();
    resetSelectedSubgroup();
  };

  return (
    <SummaryPageContainer>
      <SummaryContainer>
        <SummaryTitle>
          <h2>¡Buen Trabajo!</h2>
        </SummaryTitle>
        <SummaryText>
          <p>
            Ahora debes realizar el mismo procedimiento pero esta vez con una
            cantidad de productos constante.
          </p>
          <br />
          <p>Luego tendrás que realizar la gráficas correspondientes.</p>
        </SummaryText>
        <SummaryResult>
          <SummaryAction>
            <Button
              type="button"
              styleButton="primary"
              onClick={handleChangeGraphic}
            >
              Continuar práctica
            </Button>
          </SummaryAction>
        </SummaryResult>
      </SummaryContainer>
      <SummaryImage url={selected} />
    </SummaryPageContainer>
  );
};

export default NiceWork;
