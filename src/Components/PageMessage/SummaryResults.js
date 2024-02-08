import React, { useEffect } from "react";
import reviewing from "assets/character_images/reviewing.png";

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
import StudentTable from "Components/StudentTable";
import useModal from "hooks/useModal";
import ModalFInishPractice from "Components/Modals/ModalFInishPractice";
import useAuth from "hooks/useAuth";
import useStudent from "hooks/useStudent";
import { useHistory } from "react-router-dom";

const SummaryResults = () => {
  const history = useHistory();
  const { user, userAuthenticate } = useAuth();
  const { idPractica, updatePracticeState, finish, success, resetSuccess } =
    useStudent();
  const { isOpen, handleModalState } = useModal();

  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      history.push("/practice/student");
      resetSuccess();
    }
  }, [success, history, resetSuccess]);

  const handleFinishPractice = () => {
    handleModalState();
    updatePracticeState(idPractica, user?.estudiante.idEstudiante);
  };

  const handleGoBack = () => {
    history.push("/practice/student");
  };

  return (
    <>
      <SummaryPageContainer>
        <SummaryContainer>
          <SummaryTitle>
            {finish ? <h2>Resultados</h2> : <h2>¡Buen Trabajo!</h2>}
          </SummaryTitle>
          <SummaryText>
            {!finish && (
              <p>
                Antes de finalizar la práctica no te olvides de aplicar las
                herramientas estadistícas solicitadas por tu profesor.
              </p>
            )}
            <br />
            <p>Aquí tienes los datos de tu práctica:</p>
          </SummaryText>
          <SummaryResult>
            <StudentTable />
            <SummaryAction>
              <Button
                type="button"
                styleButton="primary"
                onClick={finish ? handleGoBack : handleModalState}
              >
                {finish ? "Volver" : "Finalizar práctica"}
              </Button>
            </SummaryAction>
          </SummaryResult>
        </SummaryContainer>
        <SummaryImage url={reviewing} />
      </SummaryPageContainer>

      <ModalFInishPractice
        isOpen={isOpen}
        close={handleModalState}
        onClick={handleFinishPractice}
      />
    </>
  );
};

export default SummaryResults;
