import React from "react";
import Navbar from "Components/Navbar";
import Dashboard from "Components/Dashboard";
import useModal from "hooks/useModal";
import ShowMessageToCreate from "Components/ShowMessageToCreate";
import ModalUploadVideo from "Components/Modals/Resources/ModalUploadVideo";
import { useEffect } from "react";
import useResource from "hooks/useResource";
import Button from "Components/Button";
import {
  VideoContainer,
  DocumentGrid,
  VideoItem,
  VideoButtonContainer,
} from "./Styles";
import Loading from "Components/Loading";
import ModalSimple from "Components/Modals/Resources/ModalSimple";
import { useState } from "react";
import { Edit } from "Icons/Edit";
import View from "Icons/View";
import { ButtonActionVariant } from "Components/CardCourseItem/styles";
function Videos() {
  const { isloading, videos, getVideos, deleteDocuments } = useResource();

  const { isOpen: isOpenSubir, handleModalState: handleModalStateSubir } =
    useModal();

  const [infoRecurso, setInfoRecurso] = useState();


  useEffect(() => {
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {isloading ? (
        <Loading />
      ) : (
        <Dashboard
          titleHeader="Videos"
          // backButton={"/courses"}
          goBack={true}
        >
          En esta sección podrás modificar los videos de cada producto que será
          mostrado en la experiencia de los estudiantes.
          <VideoContainer>
            <DocumentGrid>
              {videos.length > 0 ? (
                videos?.map((item) => (
                  <VideoItem key={item.idRecurso}>
                    <span style={{ flex: "2" }}>{item.nombreRecurso}</span>
                    <VideoButtonContainer style={{ flex: "1" }}>
                      <ButtonActionVariant
                        colorHover="primary"
                        fillColor="white"
                        onClick={() => {
                          setInfoRecurso({
                            nombreRecurso: item.nombreRecurso,
                            idRecurso: item.idRecurso,
                          });
                          // console.log(item.nombreRecurso);
                          handleModalStateSubir();
                        }}
                      >
                        <Edit />
                      </ButtonActionVariant>
                      <ButtonActionVariant
                        colorHover="primary"
                        fillColor="white"
                        stroke="white"
                        onClick={() => window.open(item.urlRecurso, "_blank")}
                      >
                        <View />
                      </ButtonActionVariant>
                    </VideoButtonContainer>
                  </VideoItem>
                ))
              ) : (
                <ShowMessageToCreate
                  text={
                    "Parece que todavía no tienes ningún documento creado ¡Crea uno nuevo!"
                  }
                />
              )}
            </DocumentGrid>
          </VideoContainer>
          <ModalUploadVideo
            isOpen={isOpenSubir}
            close={handleModalStateSubir}
            videoName={infoRecurso?.nombreRecurso}
          />
        </Dashboard>
      )}
    </>
  );
}

export default Videos;
