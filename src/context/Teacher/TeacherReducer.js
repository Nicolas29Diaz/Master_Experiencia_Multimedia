import {
  COURSE_SUCCESS,
  GET_COURSES,
  GET_ACTUAL_COURSE,
  GET_COURSE,
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

const TeacherReducer = (state, { type, payload }) => {
  switch (type) {
    case COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, payload],
      };

    case TEACHER_LOADING:
      return {
        ...state,
        isloading: payload,
      };

    case TEACHER_LOADING_ERROR:
      return {
        ...state,
        isloading: false,
      };

    case GET_COURSES:
      return {
        ...state,
        courses: payload,
        banner: [],
        groupspractices: [],
        isloading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: payload,
      };

    case GET_ACTUAL_COURSE:
      return {
        ...state,
        course: payload,
      };

    case GET_STUDENTS:
      return {
        ...state,
        students: payload,
      };

    case GET_ALL_PRACTICES_SUCCESS:
      return {
        ...state,
        practices: payload,
        isloading: false,
      };
    case GET_ALL_PRACTICES_ERROR:
      return {
        ...state,
        practices: [],
        isloading: false,
      };
    case GET_GROUPS_PRACTICE_1:
    case GET_GROUPS_PRACTICE_2:
    case GET_GROUPS_PRACTICE_3:
      return {
        ...state,
        groupspractices: payload.grupos,
        banner: payload.bannerInfo,
        isloading: false,
      };

    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.idCurso === payload.idCurso ? payload : course
        ),
      };

    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course.idCurso !== payload),
      };

    case DELETE_PRACTICE:
      return {
        ...state,
        practices: state.practices.filter(
          (pratice) => pratice.idPractica !== payload
        ),
      };

    default:
      return state;
  }
};

export default TeacherReducer;
