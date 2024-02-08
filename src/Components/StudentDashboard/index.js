import React, { useEffect } from "react";
// Components
import StudentInfo from "Components/StudentInfo";
import ImageSlider from "Components/ImageSlider";
import StudentExtraInfo from "Components/StudentExtraInfo";
import ProgressBar from "Components/ProgressBar";
import PageMessage from "Components/PageMessage";

// Styles
import {
  BackgrounContainer,
  ConfigPractice,
  StudentData,
  Info,
  ProductsDisplay,
  MainStudent,
} from "./styles";

// hooks
import useStudent from "hooks/useStudent";
import useProduct from "hooks/useProduct";
import { useLocation } from "react-router";
// constants
import { CORTE3, MODULE_PRACTICE } from "constants/index";
import useAuth from "hooks/useAuth";

const StudentDashboard = () => {
  // Hooks
  const { userAuthenticate, user } = useAuth();
  const {
    modulo,
    getActualModule,
    getAllPracticesStudent,
    practicesStudent,
    getPracticeId,
    idPractica,
    getPracticeState,
    finish,
  } = useStudent();
  const { isMessageActive, changeStateMessage } = useProduct();

  const getIdStudent = user?.estudiante?.idEstudiante;

  const { pathname } = useLocation();
  const urlModule = pathname.split("/")[5];
  const urlidpractice = Number(pathname.split("/")[4]);
  const selectedModule = MODULE_PRACTICE[urlModule];

  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (modulo === CORTE3 && finish === 0) {
      changeStateMessage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modulo]);

  useEffect(() => {
    getPracticeState(idPractica, getIdStudent);

    if (finish === 1) {
      changeStateMessage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPractica, getIdStudent, finish]);

  useEffect(() => {
    if (!modulo) {
      getActualModule(selectedModule);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!practicesStudent.length) {
      getAllPracticesStudent(getIdStudent);
    }
    // eslint-disable-next-line
  }, [getIdStudent, practicesStudent]);

  useEffect(() => {
    if (idPractica === null) {
      getPracticeId(urlidpractice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPractica, urlidpractice]);

  return (
    <BackgrounContainer>
      <MainStudent>
        {finish === 0 && (
          <ConfigPractice>
            <ProgressBar />
            {modulo !== CORTE3 && <StudentExtraInfo />}
          </ConfigPractice>
        )}
        <StudentData>
          {isMessageActive ? (
            <PageMessage />
          ) : (
            <>
              <ProductsDisplay>
                <ImageSlider />
              </ProductsDisplay>
              <Info>
                <StudentInfo />
              </Info>
            </>
          )}
        </StudentData>
      </MainStudent>
    </BackgrounContainer>
  );
};

export default StudentDashboard;
