import React from "react";
import Modal from "Components/Modal";
import Button from "Components/Button";
import { Actions } from "./styles";

const ModalEnviromentBack = ({ isOpen, close, onClick }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>¿Deseas volver a las prácticas?</h1>
      <br />
      <p>
        Al hacer click en la opción en <strong>sí</strong> volveras a la página
        de prácticas y todo progreso se perderá. Sin embargo, puedes volver a
        iniciar esta práctica en cualquier momento.
      </p>

      <Actions>
        <Button type="button" styleButton="secondary" onClick={close}>
          No, seguir aquí
        </Button>
        <Button type="button" styleButton="primary" onClick={onClick}>
          Si, volver
        </Button>
      </Actions>
    </Modal>
  );
};

export default ModalEnviromentBack;
