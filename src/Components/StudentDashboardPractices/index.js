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

  useEffect(() => {
    userAuthenticate();
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

  const handleRedirectoPractice = ({
    nombrePractica,
    idPractica,
    idCorte,
    nombreProducto,
    descripcion,
  }) => {
    let infoPractice = {
      nombre: nombrePractica,
      descripcion,
      producto: nombreProducto,
      corte: idCorte,
      estudiante: `${user?.estudiante.nombreEstudiante} ${user?.estudiante.apellidoEstudiante}`,
      url: `${pathname}/dashboard/${idPractica}/corte-${idCorte}`,
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
                    <ActionButtonContainer>
                      <Button
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
                    </ActionButtonContainer>
                  </CardContainer>
                )
              )}
          </StudentPracticesContainer>
        </>
      )}
    </Dashboard>
  );
};

export default StudentDashboardPractices;
