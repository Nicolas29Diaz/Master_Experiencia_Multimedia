import React from "react";
import { useReducer } from "react";
import ResourcesReducer from "./ResourcesReducer";
import ResourceContext from "./ResourceContext";
import axiosClient from "config/axios";
import toast from "react-hot-toast";
import { uploadFile, deleteFile } from "config/firebase";

function ResoucesState({ children }) {
  const initialState = {
    isloading: false,
    videos: [],
    documents: [],
    students: [],
  };

  const [state, dispatch] = useReducer(ResourcesReducer, initialState);

  const Loading = () => {
    dispatch({
      type: "RESOURCES_LOADING",
      payload: true,
    });
  };

  //VIDEO
  const getVideos = async () => {
    try {
      Loading();
      const response = await axiosClient.get("/api/recursos/videos");
      dispatch({
        type: "GET_VIDEOS",
        payload: response.data,
      });
    } catch (error) {
      Error();
      console.log(error);
    }
  };

  //DOCUMENTS
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

  //STUDENTS
  const getStudents = async () => {
    try {
      Loading();
      const response = await axiosClient.get("/api/estudiante/all");
      dispatch({
        type: "GET_STUDENTS",
        payload: response.data.estudiantes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (data) => {
    // Mostrar toast de carga
    const loadingToastId = toast.loading("Eliminando estudiante...");
    console.log(data);
    try {
      // Eliminar el documento de la API
      await axiosClient.delete(`/api/estudiante/${data.idRecurso}`);

      // Se actualiza el estado y se muestra un toast de éxito
      dispatch({
        type: "DELETE_STUDENT",
        payload: data.idRecurso,
      });
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.success("Estudiante eliminado con éxito");
    } catch (error) {
      // Si hay un error al eliminar el documento de la API, se captura y se maneja
      console.error("Error al eliminar el estudiante:", error);
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.error("Error al eliminar el estudiante");
    }
  };

  const deleteAllStudents = async () => {
    // Mostrar toast de carga
    const loadingToastId = toast.loading("Eliminando estudiantes...");

    try {
      // Eliminar el documento de la API
      await axiosClient.delete(`/api/estudiante/`);

      // Se actualiza el estado y se muestra un toast de éxito
      dispatch({
        type: "DELETE_STUDENTS",
        payload: [],
      });
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.success("Estudiantes eliminados con éxito");
    } catch (error) {
      // Si hay un error al eliminar el documento de la API, se captura y se maneja
      console.error("Error al eliminar los estudiantes:", error);
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.error("Error al eliminar los estudiantes");
    }
  };

  const postStudents = async (data) => {
    // Mostrar toast de carga
    const loadingToastId = toast.loading("Registrando estudiantes...");

    // Verificar si hay algún estudiante con el mismo id en ambos arrays
    for (const dataStudent of data) {
      let found = false;
      let id = "";
      for (const stateStudent of state.students) {
        if (dataStudent.id === stateStudent.idEstudiante + "") {
          found = true;
          id = dataStudent.id;
          break;
        }
      }
      if (found) {
        toast.dismiss(loadingToastId);
        toast.error(`Ya ha sido registrado un estudiante con el código ${id}.`);
        return;
      }
    }

    try {
      await axiosClient.post(`/api/usuario/registerAll`, data);

      // dispatch({
      //   type: "POST_STUDENTS",
      //   payload: response.data.response,
      // });

      getStudents();

      toast.dismiss(loadingToastId);
      toast.success("Estudiantes registrados con éxito");
    } catch (error) {
      // Si hay un error al eliminar el documento de la API, se captura y se maneja
      console.error("Error al registrar los estudiantes:", error);
      // Cerrar el toast de carga
      toast.dismiss(loadingToastId);
      toast.error("Error al registrar los estudiantes");
    }
  };

  const changeVideo = () => {};

  return (
    <ResourceContext.Provider
      value={{
        videos: state.videos,
        documents: state.documents,
        students: state.students,
        isloading: state.isloading,
        deleteStudent,
        getVideos,
        getDocuments,
        postDocuments,
        deleteDocuments,
        changeVideo,
        getStudents,
        deleteAllStudents,
        postStudents,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

export default ResoucesState;
