import React from "react";
import ModalSimple from "./ModalSimple";
import {
  DocumentContainer,
  DocumentGrid,
  DocumentItem,
  ButtonContainer,
} from "Components/Resources/Styles";
import { useEffect } from "react";
import { useState } from "react";
import useResource from "hooks/useResource";
import Loading from "Components/Loading";
import useModal from "hooks/useModal";
import ModalUploadResource from "./ModalUploadDocument";
import ShowMessageToCreate from "Components/ShowMessageToCreate";
import { Delete } from "Icons/Delete";
import View from "Icons/View";
import { ButtonActionVariant } from "Components/CardCourseItem/styles";
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
              {documents?.length > 0 ? (
                documents.map((item) => (
                  <DocumentItem key={item.idRecurso}>
                    <span style={{ flex: "2" }}>{item.nombreRecurso}</span>
                    <ButtonContainer style={{ flex: "1" }}>
                      <ButtonActionVariant
                        colorHover="delete"
                        fillColor="white"
                        onClick={() => {
                          setInfoRecurso({
                            nombreRecurso: item.nombreRecurso,
                            idRecurso: item.idRecurso,
                          });
                          handleModalStateDelete();
                        }}
                      >
                        <Delete />
                      </ButtonActionVariant>
                      <ButtonActionVariant
                        colorHover="primary"
                        fillColor="white"
                        stroke="white"
                        onClick={() => window.open(item.urlRecurso, "_blank")}
                      >
                        <View />
                      </ButtonActionVariant>
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

      {/* PONER EN OTRO COMPONENTE, OPCIONAL*/}
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
