import {
  GET_DOCUMENTS,
  GET_VIDEOS,
  RESOURCES_LOADING,
  DELETE_DOCUMENT,
  POST_DOCUMENT,
  GET_STUDENTS,
} from "types";

export default function ResourcesReducer(state, { payload, type }) {
  switch (type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: payload,
        isloading: false,
      };

    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
      };

    case RESOURCES_LOADING:
      return {
        ...state,
        isloading: payload,
      };
    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(
          (document) => document.idRecurso !== payload
        ),
      };
    case POST_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, payload],
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: payload,
        isloading: false,
      };
    default:
      return state;
  }
}
