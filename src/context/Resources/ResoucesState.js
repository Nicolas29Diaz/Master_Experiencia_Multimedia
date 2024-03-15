import React from "react";
import { useReducer } from "react";
import ResourcesReducer from "./ResourcesReducer";
import ResourceContext from "./ResourceContext";
import axios from "axios";

function ResoucesState({ children }) {
  const initialState = {
    videos: [],
    documents: [],
  };

  const [state, dispatch] = useReducer(ResourcesReducer, initialState);

  const getVideos = async () => {
    try {
      //   Loading();

      const response = await axios.get("/api/recursos/videos");

      console.log(response);

      //   dispatch({
      //     type: GET_COURSES,
      //     payload: response.data.cursos,
      //   });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  const getDocuments = async () => {
    try {
      //   Loading();
      const response = await axios.get("/api/recursos/documents");

      console.log(response);

      //   dispatch({
      //     type: GET_COURSES,
      //     payload: response.data.cursos,
      //   });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  const postDocuments = () => {};

  const deleteDocuments = () => {};

  const changeVideo = () => {};

  return (
    <ResourceContext.Provider
      value={{
        videos: state.videos,
        documents: state.documents,
        getVideos,
        getDocuments,
        postDocuments,
        deleteDocuments,
        changeVideo,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

export default ResoucesState;
