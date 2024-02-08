import React from "react";
import { useHistory } from "react-router-dom";
import {
  CardContainer,
  BackgrounImage,
  CardInfo,
  TitleCard,
  CardActions,
  ButtonAction,
} from "./styles";
import { Delete } from "Icons/Delete";
import useTeacher from "hooks/useTeacher";
import ModalDeletePractice from "Components/Modals/ModalDeletePractice";
import useModal from "hooks/useModal";
const CardPractice = ({ practica, idCurso }) => {
  const { deletePractice } = useTeacher();
  const { isOpen, handleModalState } = useModal();
  const { idCorteP, idPractica, nombrePractica } = practica;
  let history = useHistory();

  const handleHistoryPractice = () => {
    history.push(`${idCurso}/practice${idCorteP}/${idPractica}`);
  };

  return (
    <>
      <CardContainer>
        <BackgrounImage />
        <CardInfo onClick={handleHistoryPractice}>
          <TitleCard>{nombrePractica}</TitleCard>
        </CardInfo>
        <CardActions>
          <ButtonAction onClick={handleModalState}>
            <Delete />
          </ButtonAction>
        </CardActions>
      </CardContainer>

      <ModalDeletePractice
        isOpen={isOpen}
        close={handleModalState}
        onClick={() => deletePractice(idPractica)}
      />
    </>
  );
};

export default CardPractice;
