import React from "react";
import Modal from "Components/Modal";
import Button from "Components/Button";
import { Actions } from "./styles";

const ModalDeletePractice = ({ isOpen, close, onClick }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>¿Estas seguro que desear eliminar la práctica?</h1>
      <p>
        Si presiona la opción <strong>sí</strong>, toda la información de esta
        práctica será eliminada.
      </p>
      <Actions>
        <Button type="button" styleButton="secondary" onClick={close}>
          Cancelar
        </Button>
        <Button type="button" styleButton="primary" onClick={onClick}>
          Sí, estoy seguro
        </Button>
      </Actions>
    </Modal>
  );
};

export default ModalDeletePractice;
