import React from "react";
// Components
import SummaryResults from "./SummaryResults";
import NiceWorkMessage from "./NiceWorkMessage";
import DoingGreatMessage from "./DoingGreatMessage";
import ConditionsContainer from "./ConditionsContainer";
import {
  RANDOM,
  CONSTANT,
  VARIABLE,
  CORTE2,
  CORTE1,
  CORTE3,
} from "constants/index";
import useStudent from "hooks/useStudent";
import useProgressBar from "hooks/useProgressBar";

const PageMessage = () => {
  const { step } = useProgressBar();
  const { keysArrayGraphic, modulo, finish } = useStudent();
  const SELECTEDPAGE = {
    results: <SummaryResults />,
    module2A: <NiceWorkMessage />,
    module2B: <DoingGreatMessage />,
    module3: <ConditionsContainer />,
  };

  const showPagesModule1 = {
    0: SELECTEDPAGE["results"],
  };

  const showPagesModule3 = {
    0: SELECTEDPAGE["module3"],
    2: SELECTEDPAGE["results"],
  };

  const showPagesModule2RandomConstant = {
    0: SELECTEDPAGE["module2A"],
    1: SELECTEDPAGE["results"],
  };

  const showPagesModule2RandomVariable = {
    0: SELECTEDPAGE["module2B"],
    1: SELECTEDPAGE["results"],
  };

  const showPagesModule2ConstantVariable = {
    0: SELECTEDPAGE["module2B"],
    1: SELECTEDPAGE["results"],
  };

  const showPagesModule2 = {
    0: SELECTEDPAGE["module2A"],
    1: SELECTEDPAGE["module2B"],
    2: SELECTEDPAGE["results"],
  };

  function getPages(modulo) {
    if (modulo === CORTE1) {
      return showPagesModule1[step];
    }

    if (modulo === CORTE2 && finish === 0) {
      if (keysArrayGraphic.length === 1) {
        return SELECTEDPAGE["results"];
      }

      if (
        keysArrayGraphic.length === 2 &&
        keysArrayGraphic[0] === RANDOM &&
        keysArrayGraphic[1] === CONSTANT
      ) {
        return showPagesModule2RandomConstant[step];
      }
      if (
        keysArrayGraphic.length === 2 &&
        keysArrayGraphic[0] === RANDOM &&
        keysArrayGraphic[1] === VARIABLE
      ) {
        return showPagesModule2RandomVariable[step];
      }
      if (
        keysArrayGraphic.length === 2 &&
        keysArrayGraphic[0] === CONSTANT &&
        keysArrayGraphic[1] === VARIABLE
      ) {
        return showPagesModule2ConstantVariable[step];
      }

      if (keysArrayGraphic.length === 3) {
        return showPagesModule2[step];
      }
    }

    if (modulo === CORTE3 && finish === 0) {
      return showPagesModule3[step];
    }

    // Muestra los resultados si el estudiante ha terminado la práctica
    if ((modulo === CORTE2 || modulo === CORTE3) && finish === 1) {
      return SELECTEDPAGE["results"];
    }
  }

  const page = getPages(modulo);
  return <>{page}</>;
};

export default PageMessage;
