import React, { useReducer, useCallback } from "react";
import TeacherContext from "./TeacherContext";
import TeacherReducer from "./TeacherReducer";
import axiosClient from "config/axios";
import toast from "react-hot-toast";
import {
  COURSE_SUCCESS,
  GET_COURSES,
  GET_COURSE,
  GET_ACTUAL_COURSE,
  GET_STUDENTS,
  GET_ALL_PRACTICES_SUCCESS,
  GET_ALL_PRACTICES_ERROR,
  GET_GROUPS_PRACTICE_1,
  GET_GROUPS_PRACTICE_2,
  GET_GROUPS_PRACTICE_3,
  UPDATE_COURSE,
  DELETE_COURSE,
  DELETE_PRACTICE,
  TEACHER_LOADING,
  TEACHER_LOADING_ERROR,
} from "types/index";

const TeacherState = ({ children }) => {
  const initialState = {
    courses: [],
    course: null,
    students: [],
    practices: [],
    groupspractices: [],
    isloading: false,
    banner: [],
  };

  const [state, dispatch] = useReducer(TeacherReducer, initialState);

  const Loading = () =>
    dispatch({
      type: TEACHER_LOADING,
      payload: true,
    });

  const Error = () => {
    dispatch({
      type: TEACHER_LOADING_ERROR,
    });
  };

  const createNewCourse = async (data) => {
    try {
      const response = axiosClient.post("/api/cursos", data);

      // Alerta que muestra el estado de creación del curso
      toast.promise(
        response,
        {
          loading: "Creando curso...",
          success: (res) => {
            dispatch({
              type: COURSE_SUCCESS,
              payload: res.data.curso,
            });
            return `${res.data.curso.nombreCurso} creado con éxito`;
          },
          error: "Error al crear el curso",
        },
        {
          style: {
            minWidth: 250,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCourses = async () => {
    try {
      Loading();

      const response = await axiosClient.get("/api/cursos");
      dispatch({
        type: GET_COURSES,
        payload: response.data.cursos,
      });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  const updateCourse = (idCurso, data) => {
    try {
      const response = axiosClient.put(`/api/cursos/curso/${idCurso}`, data);

      // Alerta que muestra el estado de creación del curso
      toast.promise(response, {
        loading: "Editando curso...",
        success: (res) => {
          dispatch({
            type: UPDATE_COURSE,
            payload: res.data.curso,
          });
          return "Curso editado con éxito";
        },
        error: "Error al editar el curso",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = (idCurso) => {
    try {
      const response = axiosClient.delete(`/api/cursos/curso/${idCurso}`);

      // Alerta que muestra el estado de creación del curso
      toast.promise(response, {
        loading: "Eliminando curso...",
        success: (res) => {
          dispatch({
            type: DELETE_COURSE,
            payload: idCurso,
          });
          return res.data.msg;
        },
        error: "Error al eliminar el curso",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePractice = (idPractica) => {
    try {
      const response = axiosClient.delete(`/api/practicas/${idPractica}`);

      // Alerta que muestra el estado de creación del curso
      toast.promise(response, {
        loading: "Eliminando práctica...",
        success: (res) => {
          dispatch({
            type: DELETE_PRACTICE,
            payload: idPractica,
          });
          return res.data.msg;
        },
        error: "Error al eliminar la práctica",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOneCourse = async (idCurso) => {
    try {
      const response = await axiosClient.get(`/api/cursos/${idCurso}`);
      dispatch({
        type: GET_COURSE,
        payload: response.data.curso,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getActualCourse = (curso) => {
    dispatch({
      type: GET_ACTUAL_COURSE,
      payload: curso,
    });
  };

  const getStudents = async () => {
    try {
      const response = await axiosClient.get("/api/estudiante");

      dispatch({
        type: GET_STUDENTS,
        payload: response.data.estudiantes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPractices = useCallback(async (idCurso) => {
    try {
      Loading();
      const response = await axiosClient.get(`/api/practicas/${idCurso}`);
      dispatch({
        type: GET_ALL_PRACTICES_SUCCESS,
        payload: response.data.practices,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRACTICES_ERROR,
      });
      console.log(error);
    }
  }, []);

  const getGroupsPractice1 = async (idPractica) => {
    try {
      Loading();
      const response = await axiosClient.get(
        `/api/practicas/practica1/${idPractica}`
      );

      dispatch({
        type: GET_GROUPS_PRACTICE_1,
        payload: response.data,
      });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  const getGroupsPractice2 = async (idPractica) => {
    try {
      Loading();

      const response = await axiosClient.get(
        `/api/practicas/practica2/${idPractica}`
      );

      dispatch({
        type: GET_GROUPS_PRACTICE_2,
        payload: response.data,
      });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  const getGroupsPractice3 = async (idPractica) => {
    try {
      Loading();

      const response = await axiosClient.get(
        `/api/practicas/practica3/${idPractica}`
      );

      dispatch({
        type: GET_GROUPS_PRACTICE_3,
        payload: response.data,
      });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  return (
    <TeacherContext.Provider
      value={{
        courses: state.courses,
        course: state.course,
        students: state.students,
        practices: state.practices,
        groupspractices: state.groupspractices,
        isloading: state.isloading,
        banner: state.banner,
        createNewCourse,
        getCourses,
        getOneCourse,
        getActualCourse,
        getStudents,
        getAllPractices,
        getGroupsPractice1,
        getGroupsPractice2,
        getGroupsPractice3,
        updateCourse,
        deleteCourse,
        deletePractice,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
export default TeacherState;
