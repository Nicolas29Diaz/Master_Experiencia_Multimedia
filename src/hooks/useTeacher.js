import { useContext } from "react";
import TeacherContext from "context/Teacher/TeacherContext";

const useTeacher = () => {
  const teacherContext = useContext(TeacherContext);
  const {
    courses,
    course,
    students,
    practices,
    groupspractices,
    isloading,
    banner,
    getCourses,
    getOneCourse,
    getActualCourse,
    getStudents,
    createNewCourse,
    getAllPractices,
    getGroupsPractice1,
    getGroupsPractice2,
    getGroupsPractice3,
    updateCourse,
    deleteCourse,
    deletePractice,
  } = teacherContext;

  return {
    courses,
    course,
    students,
    practices,
    groupspractices,
    isloading,
    banner,
    getCourses,
    getOneCourse,
    getActualCourse,
    getStudents,
    createNewCourse,
    getAllPractices,
    getGroupsPractice1,
    getGroupsPractice2,
    getGroupsPractice3,
    updateCourse,
    deleteCourse,
    deletePractice,
  };
};

export default useTeacher;
