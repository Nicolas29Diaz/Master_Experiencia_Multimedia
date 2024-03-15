import Modal from "Components/Modal";
import React from "react";
import Button from "Components/Button";
import { ButtonContainer } from "./styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ModalGeneral = ({
  isOpen,
  close,
  title,
  description,
  buttonsDown = [],
  buttonsMiddle = [],
  children,
}) => {
  let history = useHistory();

  let buttonKey = 0;

  const renderButtons = (buttonsArray) => {
    if (buttonsArray.length === 0) return;
    return buttonsArray.map((button, index) => (
      <Button
        key={(buttonKey += 1)}
        type="button"
        styleButton={button?.styleButton}
        onClick={button.onClick}
      >
        {button?.text}
      </Button>
    ));
  };

  const buttonsDownContent = renderButtons(buttonsDown);
  const buttonsMiddleContent = renderButtons(buttonsMiddle);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{title}</h1>
        <p>{description}</p>
        <ButtonContainer>{buttonsMiddleContent}</ButtonContainer>
        <ButtonContainer>{buttonsDownContent}</ButtonContainer>
        <Button
          key={1}
          type="button"
          styleButton={"primary"}
          onClick={() => {
            close();
            history.push(`/resources/video`);
          }}
        >
          Redirigir
        </Button>
      </div>
      {children} {/* Contenido personalizado dentro del modal */}
    </Modal>
  );
};

export default ModalGeneral;
