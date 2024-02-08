import React from "react";
import Modal from "Components/Modal";
import Button from "Components/Button";
import { Actions } from "./styles";

const ModalFInishPractice = ({ isOpen, close, onClick }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>¿Deseas terminar la práctica?</h1>
      <br />
      <h3>Antes de finalizar...</h3>
      <p>
        Recuerda utilizar la informacion recolectada para realizar las
        herramientas estadísticas solicitadas por tu docente en la guía de la
        práctica.
      </p>

      <Actions>
        <Button type="button" styleButton="secondary" onClick={close}>
          Cancelar
        </Button>
        <Button type="button" styleButton="primary" onClick={onClick}>
          Finalizar práctica
        </Button>
      </Actions>
    </Modal>
  );
};

export default ModalFInishPractice;
