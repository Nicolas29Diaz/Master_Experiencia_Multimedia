import React from "react";
import Modal from "Components/Modal";
import Button from "Components/Button";
import { Actions } from "./styles";

const ModalExitForm = ({ isOpen, close, onClick }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>¿Está seguro que desea descartar los cambios?</h1>
      <p>
        Si presiona la opción <strong>sí</strong>, los cambios realizados no se
        guardarán.
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
export default ModalExitForm;
