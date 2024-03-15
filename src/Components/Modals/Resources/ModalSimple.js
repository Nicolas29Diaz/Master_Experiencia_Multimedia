import React from "react";
import Modal from "Components/Modal";
import Button from "Components/Button";
import { ButtonContainer } from "Components/Modal/styles";

function ModalSimple({
  isOpen,
  close,
  title,
  description,
  buttons = [],
  children,
}) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {title && <h1 style={{ textAlign: "center" }}>{title}</h1>}
        {description && <p>{description}</p>}
        {children}
        {buttons.length > 0 && (
          <ButtonContainer>
            {buttons.map((item, index) => (
              <Button
                key={index}
                type="button"
                styleButton={item.style}
                onClick={item.action}
              >
                {item.text}
              </Button>
            ))}
          </ButtonContainer>
        )}
      </div>
    </Modal>
  );
}

export default ModalSimple;
