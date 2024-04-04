import React from "react";
import Navbar from "Components/Navbar";
import Dashboard from "Components/Dashboard";
import useModal from "hooks/useModal";
import ShowMessageToCreate from "Components/ShowMessageToCreate";
import ModalUploadStudents from "Components/Modals/Resources/ModalUploadStudents";
import { useEffect } from "react";
import useResource from "hooks/useResource";
import { ButtonAction } from "Components/CardCourseItem/styles";
import { Delete } from "Icons/Delete";
import { DocumentContainer, DocumentGrid, StudentContainer } from "./Styles";
import Loading from "Components/Loading";
import ModalSimple from "Components/Modals/Resources/ModalSimple";
import { useState } from "react";
//
function Students() {
  const { isloading, students, getStudents, deleteStudent, deleteAllStudents } =
    useResource();

  const {
    isOpen: isOpenDeleteAll,
    handleModalState: handleModalStateDeleteAll,
  } = useModal();
  const { isOpen: isOpenDelete, handleModalState: handleModalStateDelete } =
    useModal();
  const { isOpen: isOpenUpload, handleModalState: handleModalStateUpload } =
    useModal();

  const [infoRecurso, setInfoRecurso] = useState();


  const [buttons, setButtons] = useState([
    {
      text: "Eliminar todos",
      style: "delete",
      action: handleModalStateDeleteAll,
    },
  ]);

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      setButtons([
        {
          text: "Eliminar todos",
          style: "delete",
          action: handleModalStateDeleteAll,
        },
        {
          text: "Registrar",
          style: "secondary",
          action: handleModalStateUpload,
        },
      ]);
    } else {
      setButtons([
        {
          text: "Registrar",
          style: "secondary",
          action: handleModalStateUpload,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students]);

  return (
    <>
      <Navbar />
      {isloading ? (
        <Loading />
      ) : (
        <Dashboard
          titleHeader="Estudiantes"
          buttons={buttons}
          backButton={"/courses"}
        >
          <DocumentContainer>
            <DocumentGrid>
              {students?.length > 0 ? (
                students?.map((item) => (
                  <StudentContainer key={item.idEstudiante}>
                    <span style={{ flex: "1" }}>{item.idEstudiante}</span>
                    <span style={{ flex: "2" }}>{item.estudiante}</span>
                    <span style={{ flex: "2" }}>{item.emailEstudiante}</span>
                    <div
                      style={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <ButtonAction
                        onClick={() => {
                          setInfoRecurso({
                            nombreRecurso: item.estudiante,
                            idRecurso: item.idEstudiante,
                          });
                          handleModalStateDelete();
                        }}
                      >
                        <Delete />
                      </ButtonAction>
                    </div>
                  </StudentContainer>
                ))
              ) : (
                <ShowMessageToCreate
                  text={
                    "Parece que todavía no hay ningún estudiante registrado ¡Puedes registrarlos!"
                  }
                />
              )}
            </DocumentGrid>
          </DocumentContainer>

          {/* REGISTRAR ESTUDIANTES */}
          {/* <ModalUploadResource
            isOpen={isOpenUpload}
            close={handleModalStateUpload}
            resourceType="students"
          /> */}
          <ModalUploadStudents
            isOpen={isOpenUpload}
            close={handleModalStateUpload}
            resourceType="students"
          />

          {/* ELIMINAR TODOS LOS ESTUDIANTES */}
          <ModalSimple
            isOpen={isOpenDeleteAll}
            close={handleModalStateDeleteAll}
            alignTitle={false}
            title={`¿Estás seguro que deseas eliminar todos los estudiantes?`}
            description={
              "Esta acción es permanente y eliminará a TODOS los estudiantes de la base de datos."
            }
            buttons={[
              {
                text: "Eliminar",
                style: "delete",
                action: () => {
                  handleModalStateDeleteAll();
                  deleteAllStudents();
                },
              },
              {
                text: "Cancelar",
                style: "secondary",
                action: handleModalStateDeleteAll,
              },
            ]}
          >
            {/* <div style={{ margin: "15px auto" }}>
              {infoRecurso?.nombreRecurso}
            </div> */}
          </ModalSimple>

          {/* ELIMINAR UN ESTUDIANTE */}
          <ModalSimple
            isOpen={isOpenDelete}
            close={handleModalStateDelete}
            alignTitle={false}
            title={`¿Estás seguro que deseas eliminar el/la estudiante ${infoRecurso?.nombreRecurso}?`}
            description={
              "Esta acción es permanente y eliminará al estudiante de la base de datos."
            }
            buttons={[
              {
                text: "Eliminar",
                style: "delete",
                action: () => {
                  handleModalStateDelete();
                  deleteStudent(infoRecurso);
                },
              },
              {
                text: "Cancelar",
                style: "secondary",
                action: handleModalStateDelete,
              },
            ]}
          >
            {/* <div style={{ margin: "15px auto" }}>
              {infoRecurso?.nombreRecurso}
            </div> */}
          </ModalSimple>
        </Dashboard>
      )}
    </>
  );
}

export default Students;
