import { useContext } from "react";
import ResourceContext from "context/Resources/ResourceContext";

export default function useResource() {
  const {
    videos,
    documents,
    students,
    isloading,
    getVideos,
    getDocuments,
    postDocuments,
    deleteDocuments,
    changeVideo,
    getStudents,
  } = useContext(ResourceContext);

  return {
    videos,
    documents,
    students,
    isloading,
    getVideos,
    getDocuments,
    postDocuments,
    deleteDocuments,
    changeVideo,
    getStudents,
  };
}
