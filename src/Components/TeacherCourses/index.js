import React, { useEffect } from "react";
import ModalCourse from "Components/Modals/ModalCourse";
import TeacherCreateCourses from "Components/TeacherCreateCourses";
import useModal from "hooks/useModal";
import useTeacher from "hooks/useTeacher";
import { TeacherCoursesContainer } from "./styles";
import CardCourseItem from "Components/CardCourseItem";
import Dashboard from "Components/Dashboard";
import Loading from "Components/Loading";
import ModalSelectResource from "Components/Modals/ModalSelectResource";
import { useState } from "react";

const TeacherCourses = () => {
  const { getCourses, courses, isloading } = useTeacher();
  const { isOpen, handleModalState } = useModal();
  const { isOpen: isOpenR, handleModalState: handleModalStateR } = useModal();

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      console.log("Chao Curso");
    };
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Dashboard
          titleHeader="Cursos"
          textButton="Crear curso"
          onClick={() => {
            handleModalStateR();
            setShowModal(true);
          }}
        >
          <TeacherCoursesContainer courses={courses}>
            {courses.length > 0 ? (
              courses.map((course) => (
                <CardCourseItem course={course} key={course.idCurso} />
              ))
            ) : (
              <TeacherCreateCourses />
            )}
          </TeacherCoursesContainer>

          <ModalCourse isOpen={isOpen} close={handleModalState} />

          {showModal && (
            <ModalSelectResource isOpen={isOpenR} close={handleModalStateR} />
            // <Modal isOpen={isOpenR} close={handleModalStateR}>
            //   <h1>¿Listo para crear un nuevo curso?</h1>
            //   <p>Ingresa en el siguiente campo el nombre de tu nuevo curso</p>

            //   <button onClick={() => history.push("/courses/resources")}>
            //     Cancelar
            //   </button>
            // </Modal>
          )}
        </Dashboard>
      )}
    </>
  );
};

export default TeacherCourses;
