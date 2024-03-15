import { useContext } from "react";
import ResourceContext from "context/Resources/ResourceContext";

export default function useResource() {
  const {
    videos,
    documents,
    getVideos,
    getDocuments,
    postDocuments,
    deleteDocuments,
    changeVideo,
  } = useContext(ResourceContext);

  return {
    videos,
    documents,
    getVideos,
    getDocuments,
    postDocuments,
    deleteDocuments,
    changeVideo,
  };
}
