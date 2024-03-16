import React from "react";
import { useReducer } from "react";
import ResourcesReducer from "./ResourcesReducer";
import ResourceContext from "./ResourceContext";
import axiosClient from "config/axios";
import toast from "react-hot-toast";
import { uploadFile, deleteFile } from "config/firebase";

function ResoucesState({ children }) {
  const initialState = {
    isLoading: false,
    videos: [],
    documents: [],
  };

  const [state, dispatch] = useReducer(ResourcesReducer, initialState);

  const Loading = () =>
    dispatch({
      type: "RESOURCES_LOADING",
      payload: true,
    });

  const getVideos = async () => {
    // const response = await axiosClient.get("/api/recursos/videos");
  };

  const getDocuments = async () => {
    try {
      Loading();
      const response = await axiosClient.get("/api/recursos/documents");
      dispatch({
        type: "GET_DOCUMENTS",
        payload: response.data,
      });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  const postDocuments = async (data) => {
    const loadingToastId = toast.loading("Subiendo documento...");

    const existingDocument = state.documents.find(
      (document) => document.nombreRecurso === data.name
    );

    if (existingDocument) {
      toast.dismiss(loadingToastId);
      toast.error("El documento ya existe, por favor cambie el nombre.");
      return;
    }

    try {
      // Mostrar toast de carga

      // Subir el documento a Firebase Storage
      const urlResult = await uploadFile(data.file, data.name, "documentos");

      // Subir los datos del documento a la API
      const docData = {
        urlRecurso: `${urlResult}`,
        nombreRecurso: `${data.name}`,
      };
      const response = await axiosClient.post(
        `/api/recursos/documents`,
        docData
      );

      // Si se suben tanto el archivo como los datos a la API correctamente
      // se actualiza el estado y se muestra un toast de éxito
      dispatch({
        type: "POST_DOCUMENT",
        payload: response.data.recurso,
      });
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.success("Documento creado con éxito");
    } catch (error) {
      // Si hay un error al subir a la API, se captura y se maneja
      console.error("Error al subir el documento:", error);
      // Si hay un error al subir a la API, se elimina el archivo de Firebase Storage
      await deleteFile(data.name, "documentos");
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.error("Error al subir el documento");
    }
  };

  const deleteDocuments = async (data) => {
    const loadingToastId = toast.loading("Eliminando documento...");
    try {
      // Mostrar toast de carga

      // Eliminar el documento de la API
      await axiosClient.delete(`/api/recursos/documents/${data.idRecurso}`);

      // Si se elimina el documento de la API correctamente,
      // se elimina también de Firebase Storage
      await deleteFile(data.nombreRecurso, "documentos");

      // Se actualiza el estado y se muestra un toast de éxito
      dispatch({
        type: "DELETE_DOCUMENT",
        payload: data.idRecurso,
      });
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.success("Documento eliminado con éxito");
    } catch (error) {
      // Si hay un error al eliminar el documento de la API, se captura y se maneja
      console.error("Error al eliminar el documento:", error);
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.error("Error al eliminar el documento");
    }
  };

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
