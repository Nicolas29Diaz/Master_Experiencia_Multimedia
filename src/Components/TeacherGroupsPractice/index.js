import React, { useEffect } from "react";
import Dashboard from "Components/Dashboard";
import Navbar from "Components/Navbar";
import CardGroup from "Components/CardGroup";
import useTeacher from "hooks/useTeacher";
import { useParams, useLocation } from "react-router-dom";
import Loading from "Components/Loading";
import { ContainerPractices } from "./styles";
const TeacherGroupsPractice = () => {
  const { pathname } = useLocation();

  let practiceSelected = pathname.split("/")[3];
  let actualCourse = pathname.split("/")[2];
  const { idPractica } = useParams();
  const {
    groupspractices,
    getGroupsPractice1,
    getGroupsPractice2,
    getGroupsPractice3,
    banner,
    isloading,
  } = useTeacher();

  useEffect(() => {
    if (practiceSelected === "practice1") {
      getGroupsPractice1(Number(idPractica));
    }

    if (practiceSelected === "practice2") {
      getGroupsPractice2(Number(idPractica));
    }

    if (practiceSelected === "practice3") {
      getGroupsPractice3(Number(idPractica));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      {isloading ? (
        <Loading />
      ) : (
        <Dashboard
          titleHeader="Información de la práctica por grupos"
          banner={banner}
          backButton={`/courses/${actualCourse}`}
        >
          <ContainerPractices>
            {groupspractices &&
              groupspractices.map((grupo, index) => (
                <CardGroup group={grupo} key={index} />
              ))}
          </ContainerPractices>
        </Dashboard>
      )}
    </>
  );
};

export default TeacherGroupsPractice;
