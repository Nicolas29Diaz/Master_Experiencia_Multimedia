import Button from "Components/Button";
import Modal from "Components/Modal";
import { Actions } from "./styles";
import React from "react";

const ModalForm = ({ isOpen, close, onClick = {} }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>¿Está seguro que deseas publicar la práctica?</h1>
      <p>
        Al presionar Sí, no podrás realizar cambios sobre la configuración de la
        práctica.
      </p>
      <Actions>
        <Button type="button" styleButton="secondary" onClick={close}>
          No, haré unos cambios
        </Button>
        <Button type="button" styleButton="primary" onClick={onClick}>
          Si, estoy seguro
        </Button>
      </Actions>
    </Modal>
  );
};

export default ModalForm;
