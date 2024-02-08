import React, { useEffect } from "react";
import ModalCourse from "Components/Modals/ModalCourse";
import TeacherCreateCourses from "Components/TeacherCreateCourses";
import useModal from "hooks/useModal";
import useTeacher from "hooks/useTeacher";
import { TeacherCoursesContainer } from "./styles";
import CardCourseItem from "Components/CardCourseItem";
import Dashboard from "Components/Dashboard";
import Loading from "Components/Loading";

const TeacherCourses = () => {
  const { getCourses, courses, isloading } = useTeacher();
  const { isOpen, handleModalState } = useModal();

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
          onClick={handleModalState}
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
        </Dashboard>
      )}
    </>
  );
};

export default TeacherCourses;
