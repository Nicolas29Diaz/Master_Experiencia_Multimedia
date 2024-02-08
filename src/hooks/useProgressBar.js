import { useContext } from "react";
import ProgressBarContext from "context/ProgressBar/ProgressBarContext";

const useProgressBar = () => {
  const progressBarContext = useContext(ProgressBarContext);

  const { step, steps, handleStep, getSteps, resetStep } = progressBarContext;

  return {
    step,
    steps,
    handleStep,
    getSteps,
    resetStep,
  };
};

export default useProgressBar;
