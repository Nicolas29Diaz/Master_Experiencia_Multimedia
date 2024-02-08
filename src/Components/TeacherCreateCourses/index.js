import React from "react";
import useModal from "hooks/useModal";
import ModalCourse from "Components/Modals/ModalCourse";
import ShowMessageToCreate from "Components/ShowMessageToCreate";

const TeacherCreateCourses = () => {
  const { isOpen, handleModalState } = useModal();

  return (
    <>
      <ShowMessageToCreate text="Parece que todavía no tienes ningún curso creado ¡Crea uno nuevo!" />

      <ModalCourse isOpen={isOpen} close={handleModalState} />
    </>
  );
};

export default TeacherCreateCourses;
