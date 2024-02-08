import React, { useEffect } from "react";
import Navbar from "Components/Navbar";
import TeacherCourses from "Components/TeacherCourses";
import useAuth from "hooks/useAuth";

const CoursesPageTeacher = () => {
  // Extraer la información de autenticación
  const { userAuthenticate } = useAuth();

  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <TeacherCourses />
    </>
  );
};

export default CoursesPageTeacher;
