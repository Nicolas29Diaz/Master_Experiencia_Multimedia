import React from "react";
import ModalSimple from "./ModalSimple";
import {
  DocumentContainer,
  DocumentGrid,
  DocumentItem,
  ButtonContainer,
} from "Components/Resources/Styles";
import Button from "Components/Button";
import ShowMessageToCreate from "Components/ShowMessageToCreate";

function ModalDocumentsStudent({ isOpen, close, recursos }) {
  return (
    <>
      <ModalSimple
        isOpen={isOpen}
        close={close}
        buttons={[
          {
            text: "Atrás",
            style: "secondary",
            action: close,
          },
        ]}
        centerButton={true}
      >
        <DocumentContainer>
          <DocumentGrid>
            {recursos?.length > 0 ? (
              recursos.map((item) => (
                <DocumentItem key={item.idRecurso}>
                  <span>{item.nombreRecurso}</span>
                  <ButtonContainer>
                    <Button
                      type="button"
                      styleButton="primary"
                      onClick={() => window.open(item.urlRecurso, "_blank")}
                    >
                      Visualizar
                    </Button>
                  </ButtonContainer>
                </DocumentItem>
              ))
            ) : (
              <ShowMessageToCreate
                text={"Parece que esta práctica no tiene ningún documento"}
              />
            )}
          </DocumentGrid>
        </DocumentContainer>
      </ModalSimple>
    </>
  );
}

export default ModalDocumentsStudent;
