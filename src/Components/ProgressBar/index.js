import React, { useCallback, useEffect, useMemo } from "react";
import useProgressBar from "hooks/useProgressBar";
import useStudent from "hooks/useStudent";
import { Progress, Steps, Bar, Step, Text } from "./styles";
import {
  CORTE1,
  CORTE2,
  CORTE3,
  RANDOM,
  CONSTANT,
  VARIABLE,
} from "constants/index";

const ProgressBar = () => {
  const { modulo, getArrayDependOnGraphic } = useStudent();
  const { step, steps, getSteps } = useProgressBar();

  const getStepsModule = useCallback((array) => {
    const objEntries = Object.entries(array).filter(
      ([_, value]) => value?.length > 0
    );
    let steps = [];

    for (let i = 0; i < objEntries.length; i++) {
      if (objEntries[i][0] === RANDOM) {
        steps.push("Productos para gráfico: atributos con n aleatorio");
      }
      if (objEntries[i][0] === CONSTANT) {
        steps.push("Productos para gráfico: atributos con n constante");
      }
      if (objEntries[i][0] === VARIABLE) {
        steps.push("Productos para gráfico: n variable");
      }
      if (i === objEntries.length - 1) {
        steps.push("Finalizar práctica");
      }
    }

    return steps;
  }, []);

  const STEPS_BY_MODULE = useMemo(
    () => ({
      [CORTE1]: ["Revisa los productos", "Finalizar práctica"],
      [CORTE2]: getStepsModule(getArrayDependOnGraphic),
      [CORTE3]: [
        "Definir tamaño de la muestra",
        "Inspección de los productos",
        "Finalizar práctica",
      ],
    }),
    [getStepsModule, getArrayDependOnGraphic]
  );

  useEffect(() => {
    getSteps(STEPS_BY_MODULE[modulo]);
  }, [modulo, STEPS_BY_MODULE, getSteps]);

  const progressBar = steps && (step / (steps.length - 1)) * 100;

  const IsSelectedOrActive = (id) =>
    id === step ? "selected" : id < step && "active";
  return (
    <Progress>
      <Steps>
        <Bar height={progressBar} />
        {steps &&
          steps.map((step, id) => {
            return (
              <Step key={id} className={IsSelectedOrActive(id)}>
                <Text>{step}</Text>
              </Step>
            );
          })}
      </Steps>
    </Progress>
  );
};

export default ProgressBar;
