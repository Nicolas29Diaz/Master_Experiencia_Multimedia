import React from "react";
import Navbar from "Components/Navbar";
import Dashboard from "Components/Dashboard";
import useModal from "hooks/useModal";
import { useState } from "react";
import ModalUploadResource from "Components/Modals/Resources/ModalUploadResource";
function Students() {
  const { isOpen: isOpenSubir, handleModalState: handleModalStateSubir } =
    useModal();

  const [showModal, setShowModal] = useState(false);
  const buttons = [
    {
      text: "Recursos",
      style: "secondary",
      action: () => {
        handleModalStateSubir();
        setShowModal(true);
      },
    },
  ];
  return (
    <>
      <Navbar />
      <Dashboard
        titleHeader="Cursos"
        textButton="Crear curso"
        buttons={buttons}
      ></Dashboard>
      {showModal && (
        <ModalUploadResource
          isOpen={isOpenSubir}
          close={handleModalStateSubir}
        />
      )}
    </>
  );
}

export default Students;