import React, { useEffect } from "react";
import Dashboard from "Components/Dashboard";
import {
  StudentPracticesContainer,
  CardContainer,
  BackgrounImage,
  CardInfo,
  StateCard,
  ActionButtonContainer,
} from "./styles";
import Button from "Components/Button";
import useStudent from "hooks/useStudent";
import useAuth from "hooks/useAuth";
import { useHistory, useLocation } from "react-router";
import useProduct from "hooks/useProduct";
import useProgressBar from "hooks/useProgressBar";
import Loading from "Components/Loading";
import ShowMessageToCreate from "Components/ShowMessageToCreate";
import { ICONS_PRODUCTS } from "constants/index";
import ModalDocumentsStudent from "Components/Modals/Resources/ModalDocumentsStudent";
import useModal from "hooks/useModal";
import { useState } from "react";
import {
  REFRESCOS,
  BOLSA_ARROZ,
  BARRA_CHOCOLATE,
  PITILLOS,
  BARRA_JABON,
} from "constants/index";
import useResource from "hooks/useResource";
const StudentDashboardPractices = () => {
  const { user, userAuthenticate } = useAuth();
  const {
    practicesStudent,
    getAllPracticesStudent,
    createInspectionProductC1,
    createInspectionProductC2,
    getPracticeId,
    modulo,
    isloading,
    resetAllState,
  } = useStudent();
  const { resetStep } = useProgressBar();
  const { isMessageActive, changeStateMessage, resetAllCounterReviews } =
    useProduct();
  const history = useHistory();
  const { pathname } = useLocation();
  const { isOpen, handleModalState } = useModal();
  const [recurso, setRecurso] = useState();

  const { getVideos, videos } = useResource();
  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetAllState();

    if (isMessageActive) {
      changeStateMessage(false);
    }

    resetStep();
    resetAllCounterReviews();

    getAllPracticesStudent(user?.estudiante?.idEstudiante);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isMessageActive, modulo]);

  function findVideoUrl(nombreRecurso) {
    console.log("entré");
    const video = videos.find((video) => video.nombreRecurso === nombreRecurso);
    return video ? video.urlRecurso : null;
  }

  const handleRedirectoPractice = ({
    nombrePractica,
    idPractica,
    idCorte,
    nombreProducto,
    descripcion,
  }) => {
    let videoURL = "";
    switch (nombreProducto) {
      case REFRESCOS:
        videoURL = findVideoUrl("Refrescos");
        break;
      case BARRA_CHOCOLATE:
        videoURL = findVideoUrl("Barra chocolate");
        break;
      case BARRA_JABON:
        videoURL = findVideoUrl("Barra jabon");
        break;
      case BOLSA_ARROZ:
        videoURL = findVideoUrl("Bolsa arroz");
        break;
      case PITILLOS:
        videoURL = findVideoUrl("Pitillos");
        break;
      default:
        break;
    }

    let infoPractice = {
      nombre: nombrePractica,
      descripcion,
      producto: nombreProducto,
      corte: idCorte,
      estudiante: `${user?.estudiante.nombreEstudiante} ${user?.estudiante.apellidoEstudiante}`,
      url: `${pathname}/dashboard/${idPractica}/corte-${idCorte}`,
      urlVideo: videoURL,
    };
    getPracticeId(idPractica);
    if (idCorte === 1) {
      history.push({
        pathname: `${pathname}/enviroment`,
        state: infoPractice,
      });
      createInspectionProductC1(idPractica, user?.estudiante?.idEstudiante);
    }
    if (idCorte === 2) {
      history.push({
        pathname: `${pathname}/enviroment`,
        state: infoPractice,
      });
      createInspectionProductC2(idPractica, user?.estudiante?.idEstudiante);
    }
    if (idCorte === 3) {
      history.push({
        pathname: `${pathname}/enviroment`,
        state: infoPractice,
      });
    }
  };

  const handleRedirectoResults = (idPractica, idCorte) => {
    getPracticeId(idPractica);
    if (idCorte === 1) {
      changeStateMessage(true);
      history.push(`${pathname}/dashboard/${idPractica}/corte-${idCorte}`);
    }
    if (idCorte === 2) {
      changeStateMessage(true);
      history.push(`${pathname}/dashboard/${idPractica}/corte-${idCorte}`);
    }
    if (idCorte === 3) {
      changeStateMessage(true);
      history.push(`${pathname}/dashboard/${idPractica}/corte-${idCorte}`);
    }
  };

  return (
    <>
      <Dashboard titleHeader="Prácticas asignadas">
        {isloading ? (
          <Loading />
        ) : (
          <>
            {!practicesStudent.length && (
              <ShowMessageToCreate text="Parece que aún no tienes ninguna práctica asignada ¡Yuju!" />
            )}
            <StudentPracticesContainer practicesStudent={practicesStudent}>
              {practicesStudent.length > 0 &&
                practicesStudent.map(
                  ({
                    id,
                    nombrePractica,
                    nombreProducto,
                    descripcion,
                    fecha,
                    estado,
                    idCorte,
                    recursos,
                  }) => (
                    <CardContainer key={id}>
                      <BackgrounImage>
                        {ICONS_PRODUCTS[nombreProducto]}
                      </BackgrounImage>
                      <CardInfo>
                        <h1>{nombrePractica}</h1>
                        <p>Producto: {nombreProducto}</p>
                        <p>F. Publicación: {fecha}</p>
                        <StateCard estado={estado}>{estado}</StateCard>
                      </CardInfo>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <ActionButtonContainer>
                          <Button
                            style={{ margin: "10px 0px" }}
                            type="button"
                            styleButton="primary"
                            onClick={() => {
                              estado === "Realizada"
                                ? handleRedirectoResults(id, idCorte)
                                : handleRedirectoPractice({
                                    nombrePractica,
                                    idPractica: id,
                                    idCorte,
                                    nombreProducto,
                                    descripcion,
                                  });
                            }}
                          >
                            {estado === "Realizada"
                              ? "Ver resultados"
                              : "Iniciar práctica"}
                          </Button>
                          <Button
                            type="button"
                            styleButton="primary"
                            onClick={() => {
                              setRecurso(recursos);
                              handleModalState();
                            }}
                          >
                            Documentos
                          </Button>
                        </ActionButtonContainer>
                      </div>
                      {/* <ActionButtonContainer>
                    
                    </ActionButtonContainer> */}
                    </CardContainer>
                  )
                )}
            </StudentPracticesContainer>
          </>
        )}
      </Dashboard>

      <ModalDocumentsStudent
        isOpen={isOpen}
        close={handleModalState}
        recursos={recurso}
      />
    </>
  );
};

export default StudentDashboardPractices;
