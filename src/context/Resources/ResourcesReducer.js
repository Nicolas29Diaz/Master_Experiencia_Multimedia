import {
  GET_DOCUMENTS,
  GET_VIDEOS,
  RESOURCES_LOADING,
  DELETE_DOCUMENT,
  POST_DOCUMENT,
} from "types";

export default function ResourcesReducer(state, { payload, type }) {
  switch (type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: payload,
        isLoading: false,
      };

    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
      };

    case RESOURCES_LOADING:
      return {
        ...state,
        isLoading: payload,
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
    default:
      return state;
  }
}
