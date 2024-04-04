import React, { useEffect } from "react";
import ModalCourse from "Components/Modals/ModalCourse";
import TeacherCreateCourses from "Components/TeacherCreateCourses";
import useModal from "hooks/useModal";
import useTeacher from "hooks/useTeacher";
import { TeacherCoursesContainer } from "./styles";
import CardCourseItem from "Components/CardCourseItem";
import Dashboard from "Components/Dashboard";
import Loading from "Components/Loading";
import { useState } from "react";
import ModalSelectResource from "Components/Modals/Resources/ModalSelectResource";
const TeacherCourses = () => {
  const { getCourses, courses, isloading } = useTeacher();
  const { isOpen, handleModalState } = useModal();
  const { isOpen: isOpenR, handleModalState: handleModalStateR } = useModal();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      "";
    };
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Dashboard
          titleHeader="Cursos"
          buttons={[
            {
              style: "secondary",
              action: () => {
                setShowModal(true);
                handleModalStateR();
              },
              text: "Gestionar",
            },
            {
              style: "secondary",
              action: () => {
                setShowModal(true);
                handleModalState();
              },
              text: "Crear curso",
            },
          ]}
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
          )}
        </Dashboard>
      )}
    </>
  );
};

export default TeacherCourses;
