import React from "react";
import Modal from "Components/Modal";
import Button from "Components/Button";
import { Actions } from "./styles";

const ModalDeleteCourse = ({ isOpen, close, onClick }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>¿Estas seguro que desear eliminar el curso?</h1>

      <Actions>
        <Button type="button" styleButton="secondary" onClick={close}>
          Cancelar
        </Button>
        <Button type="button" styleButton="primary" onClick={onClick}>
          Si,estoy seguro
        </Button>
      </Actions>
    </Modal>
  );
};

export default ModalDeleteCourse;
