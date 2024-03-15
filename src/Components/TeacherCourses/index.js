import React, { useEffect } from "react";
import ModalCourse from "Components/Modals/ModalCourse";
import TeacherCreateCourses from "Components/TeacherCreateCourses";
import useModal from "hooks/useModal";
import useTeacher from "hooks/useTeacher";
import { TeacherCoursesContainer } from "./styles";
import CardCourseItem from "Components/CardCourseItem";
import Dashboard from "Components/Dashboard";
import Loading from "Components/Loading";
import ModalGeneral from "Components/Modals/ModalGeneral";
import { useHistory } from "react-router-dom";
const TeacherCourses = () => {
  const { getCourses, courses, isloading } = useTeacher();
  const { isOpen: isOpenCurse, handleModalState: handleModalStateCurse } =
    useModal();
  const {
    isOpen: isOpenResources,
    handleModalState: handleModalStateResources,
  } = useModal();

  let history = useHistory();

  // const handleHistory = (resourceType) => {
  //   handleModalStateResources();
  //   history.push(`/resources/${resourceType}`);
  // };
  // const handleHistory2 = () => {
  //   handleModalStateResources();
  //   history.push(`/resources/video`);
  // };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Dashboard
          titleHeader="Cursos"
          textButton="Crear curso"
          onClick={[handleModalStateCurse, handleModalStateResources]}
          resources={true}
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

          <ModalCourse isOpen={isOpenCurse} close={handleModalStateCurse} />
          <ModalGeneral
            isOpen={isOpenResources}
            close={handleModalStateResources}
            title={"¿Qué tipo de recurso quieres gestionar?"}
            description={
              "Selecciona el tipo de recurso que deseas crear o eliminar."
            }
            buttonsDown={[
              {
                text: "Cancelar",
                styleButton: "secondary",
                onClick: handleModalStateResources,
              },
            ]}
            buttonsMiddle={[
              {
                text: "Estudiantes",
                styleButton: "primary",
                onClick: () => {
                  // handleHistory("student");
                  console.log("");
                },
              },
              {
                text: "Videos",
                styleButton: "primary",
                onClick: () => {
                  // handleHistory("video");
                  console.log("");
                },
              },
              {
                text: "Documentos",
                styleButton: "primary",
                onClick: () => {
                  // handleHistory("document");
                  console.log("");
                },
              },
            ]}
          />
        </Dashboard>
      )}
    </>
  );
};

export default TeacherCourses;
