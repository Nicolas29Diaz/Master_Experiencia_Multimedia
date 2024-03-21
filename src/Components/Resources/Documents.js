import React from "react";
import Navbar from "Components/Navbar";
import Dashboard from "Components/Dashboard";
import useModal from "hooks/useModal";
import ShowMessageToCreate from "Components/ShowMessageToCreate";
import ModalUploadResource from "Components/Modals/Resources/ModalUploadResource";
import { useEffect } from "react";
import useResource from "hooks/useResource";
import Button from "Components/Button";
import {
  DocumentContainer,
  DocumentGrid,
  DocumentItem,
  ButtonContainer,
} from "./Styles";
import Loading from "Components/Loading";
import ModalSimple from "Components/Modals/Resources/ModalSimple";
import { useState } from "react";
function Documents() {
  const { isloading, documents, getDocuments, deleteDocuments } = useResource();

  const { isOpen: isOpenSubir, handleModalState: handleModalStateSubir } =
    useModal();
  const { isOpen: isOpenDelete, handleModalState: handleModalStateDelete } =
    useModal();

  const [infoRecurso, setInfoRecurso] = useState();

  const buttons = [
    {
      text: "Subir",
      style: "secondary",
      action: handleModalStateSubir,
    },
  ];

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {isloading ? (
        <Loading />
      ) : (
        <Dashboard
          titleHeader="Documentos"
          buttons={buttons}
          // backButton={"/courses"}
          goBack={true}
        >
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

          <ModalUploadResource
            isOpen={isOpenSubir}
            close={handleModalStateSubir}
          />
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
            <div style={{ margin: "15px auto" }}>
              {infoRecurso?.nombreRecurso}
            </div>
          </ModalSimple>
        </Dashboard>
      )}
    </>
  );
}

export default Documents;
