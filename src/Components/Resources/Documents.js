import React from "react";
import Navbar from "Components/Navbar";
import Dashboard from "Components/Dashboard";
import useModal from "hooks/useModal";
import { useState } from "react";
import ShowMessageToCreate from "Components/ShowMessageToCreate";
import ModalUploadResource from "Components/Modals/Resources/ModalUploadResource";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import useResource from "hooks/useResource";
function Documents() {
  // const { getDocuments } = useResource();

  const { isOpen: isOpenSubir, handleModalState: handleModalStateSubir } =
    useModal();

  const [showModal, setShowModal] = useState(false);
  const buttons = [
    {
      text: "Subir",
      style: "secondary",
      action: () => {
        handleModalStateSubir();
        setShowModal(true);
      },
    },
  ];

  const { userAuthenticate } = useAuth();

  useEffect(() => {
   
  }, []);
  return (
    <>
      <Navbar />
      <Dashboard
        titleHeader="Documentos"
        buttons={buttons}
        backButton={"/courses"}
      ></Dashboard>

      <ShowMessageToCreate
        text={
          "Parece que todavía no tienes ningún documento creado ¡Crea uno nuevo!"
        }
      />
      {showModal && (
        <ModalUploadResource
          isOpen={isOpenSubir}
          close={handleModalStateSubir}
        />
      )}
    </>
  );
}

export default Documents;
