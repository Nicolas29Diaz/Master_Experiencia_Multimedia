import React from "react";
import Button from "Components/Button";
import { ButtonContainer } from "Components/Modal/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import ModalSimple from "./ModalSimple";

const ModalSelectResource = ({ isOpen, close }) => {
  let history = useHistory();

  useEffect(() => {
    console.log("Hola");
    return () => {
      console.log("Chao ModalSelectResource");
    };
  }, []);

  return (
    <>
      <ModalSimple
        isOpen={isOpen}
        close={close}
        title={"¿Qué tipo de elemento quieres gestionar?"}
        buttons={[
          {
            text: "Cancelar",
            style: "secondary",
            action: close,
          },
        ]}
      >
        <ButtonContainer style={{ margin: "30px 80px" }}>
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
            onClick={() => history.push("/courses/resources/video")}
          >
            Videos
          </Button>
        </ButtonContainer>
      </ModalSimple>
      {/* 
      <Modal isOpen={isOpen} close={close}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ margin: "10px 0px", textAlign: "center" }}>
            ¿Qué tipo de elemento quieres gestionar?
          </h1>

          <ButtonContainer style={{ margin: "15px 80px" }}>
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
      </Modal> */}
    </>
  );
};

export default ModalSelectResource;
