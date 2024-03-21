import React from "react";
import ModalSimple from "./ModalSimple";
import {
  DocumentContainer,
  DocumentGrid,
  DocumentItem,
  ButtonContainer,
} from "Components/Resources/Styles";
import Button from "Components/Button";
import { useEffect } from "react";
import { useState } from "react";
import useResource from "hooks/useResource";
import Loading from "Components/Loading";
import useModal from "hooks/useModal";
import ModalUploadResource from "./ModalUploadResource";
import ShowMessageToCreate from "Components/ShowMessageToCreate";

function ModalDocuments({ isOpen, close }) {
  const { isloading, documents, getDocuments, deleteDocuments } = useResource();

  const { isOpen: isOpenSubir, handleModalState: handleModalStateSubir } =
    useModal();

  const { isOpen: isOpenDelete, handleModalState: handleModalStateDelete } =
    useModal();

  const [infoRecurso, setInfoRecurso] = useState();

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ModalSimple
        isOpen={isOpen}
        close={close}
        buttons={[
          {
            text: "Cancelar",
            style: "secondary",
            action: close,
          },
          {
            text: "Subir",
            style: "primary",
            action: () => {
              close();
              handleModalStateSubir();
            },
          },
        ]}
      >
        {isloading ? (
          <Loading />
        ) : (
          <DocumentContainer>
            <DocumentGrid>
              {documents.length > 0 ? (
                documents.map((item) => (
                  <DocumentItem key={item.idRecurso}>
                    <span>{item.nombreRecurso}</span>
                    <ButtonContainer>
                      <Button
                        type="button"
                        styleButton="delete"
                        onClick={() => {
                          setInfoRecurso({
                            nombreRecurso: item.nombreRecurso,
                            idRecurso: item.idRecurso,
                          });
                          handleModalStateDelete();
                        }}
                      >
                        Eliminar
                      </Button>
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
                  text={
                    "Parece que todavía no tienes ningún documento creado ¡Crea uno nuevo!"
                  }
                />
              )}
            </DocumentGrid>
          </DocumentContainer>
        )}
      </ModalSimple>

      {/*  ELIMINAR, PONER EN OTRO COMPONENTE*/}
      <ModalSimple
        isOpen={isOpenDelete}
        close={handleModalStateDelete}
        title={"¿Estás seguro que deseas eliminar este archivo?"}
        // description={"chao"}
        buttons={[
          {
            text: "Eliminar",
            style: "delete",
            action: () => {
              handleModalStateDelete();
              deleteDocuments(infoRecurso);
            },
          },
          {
            text: "Cancelar",
            style: "secondary",
            action: handleModalStateDelete,
          },
        ]}
      >
        <div style={{ margin: "15px auto" }}>{infoRecurso?.nombreRecurso}</div>
      </ModalSimple>

      <ModalUploadResource isOpen={isOpenSubir} close={handleModalStateSubir} />
    </>
  );
}

export default ModalDocuments;
