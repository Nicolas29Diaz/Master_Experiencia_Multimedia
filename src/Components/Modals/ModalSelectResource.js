import Modal from "Components/Modal";
import React from "react";
import Button from "Components/Button";
import { ButtonContainer } from "Components/Modal/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

const ModalSelectResource = ({ isOpen, close }) => {
  let history = useHistory();

  useEffect(() => {
    console.log("Hola");
    return () => {
      console.log("Chao ModalSelectResource");
    };
  }, []);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>¿Qué tipo de recurso quieres gestionar?</h1>
        <p>Selecciona el tipo de recurso que deseas crear o eliminar.</p>
        <ButtonContainer>
          <Button
            type="button"
            styleButton="primary"
            onClick={() => history.push("/courses/resources/student")}
          >
            Estudiantes
          </Button>
          <Button
            type="button"
            styleButton="primary"
            onClick={() => history.push("/courses/resources/document")}
          >
            Documentos
          </Button>
          <Button
            type="button"
            styleButton="primary"
            onClick={() => history.push("/courses/resources/video")}
          >
            Videos
          </Button>
        </ButtonContainer>

        <ButtonContainer>
          <Button type="button" styleButton="secondary" onClick={close}>
            Cancelar
          </Button>
        </ButtonContainer>
      </div>
    </Modal>
  );
};

export default ModalSelectResource;
