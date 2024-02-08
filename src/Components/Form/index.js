import React, { useState, useEffect } from "react";

import { useForm, Controller, FormProvider } from "react-hook-form";
//Styles
import { FormStyle, Title, Row, ButtonActions } from "./styles";

//Components
import TextField from "Components/TextField";
import Button from "Components/Button";
import MultiSelectAll from "Components/MultiSelectAll";
import TextArea from "Components/TextArea";
import PracticeGroup from "Components/Practice/PracticeGroup";
import { useHistory, useParams } from "react-router-dom";

import ModalForm from "Components/Modals/ModalForm";
import useModal from "hooks/useModal";
import useTeacher from "hooks/useTeacher";
import {
  registerPracticeModule1,
  registerPracticeModule2,
  registerPracticeModule3,
} from "./FormServices";
import ModalExitForm from "Components/Modals/ModalExitForm";
//Data
import { optionsModulos, CORTE1, CORTE2, CORTE3 } from "constants/index";

const Form = () => {
  const methods = useForm();
  const { idCurso } = useParams();
  const history = useHistory();
  const [exitForm, setExitForm] = useState(false);
  // Comprueba la cantidad de los grupos
  const numberOfGroupsWatch = methods.watch("groups");

  const { getStudents, students } = useTeacher();

  // Estado que permite saber cuando el usuario confirma la creación de la práctica
  const [isSendForm, setIsSendForm] = useState(false);
  // Estado que almacena temporalmente la información antes de confirmar
  // la creación de la práctica
  const [dataForm, setDataForm] = useState([]);

  const { isOpen, handleModalState } = useModal();

  const parseIntIdCurso = Number(idCurso);

  const handleExitForm = () => {
    setExitForm(!exitForm);
  };

  const error = methods.formState.errors;
  const isFormValid = methods.formState.isValid;

  const sendFormValid = () => setIsSendForm(true);

  const resetAll = () => {
    setDataForm([]);
    setIsSendForm(false);
  };
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /* Función que envía todos los datos del formulario */
    const handleOnSubmit = async (data) => {
      const {
        field: {
          modulo: { value },
        },
      } = data;
      if (value === CORTE1) {
        registerPracticeModule1({ ...data, parseIntIdCurso }, idCurso, history);
      }

      if (value === CORTE2) {
        registerPracticeModule2({ ...data, parseIntIdCurso }, idCurso, history);
      }

      if (value === CORTE3) {
        registerPracticeModule3({ ...data, parseIntIdCurso }, idCurso, history);
      }
    };
    if (isSendForm) {
      handleOnSubmit(dataForm);
      resetAll();
      handleModalState();
    }
  }, [
    parseIntIdCurso,
    dataForm,
    isSendForm,
    history,
    idCurso,
    handleModalState,
  ]);

  const getAllMembers = (option) => {
    if (
      option.action === "select-option" &&
      option.option.idEstudiante === "*"
    ) {
      methods.setValue(option.name, students);
    }
  };

  function handleTipoMuestreo(e) {
    e.value === CORTE3
      ? methods.setValue("field.tipoMuestreo", "variable")
      : methods.setValue("field.tipoMuestreo", "");
  }

  return (
    <>
      <FormProvider {...methods}>
        <FormStyle
          onSubmit={(event) => {
            methods.handleSubmit(async (values) => {
              if (isFormValid) {
                handleModalState();
                setDataForm(values);
              }
              if (isSendForm) setDataForm(values);
            })(event);
          }}
          noValidate
        >
          <Title>Configurar nueva práctica</Title>
          <Row>
            <TextField
              type="text"
              placeholder="Nombre de la práctica"
              error={error.field?.nombrePractica}
              {...methods.register("field.nombrePractica", {
                required: "Escriba el nombre de la práctica",
              })}
            />
            <Controller
              name="field.modulo"
              control={methods.control}
              rules={{ required: "Selecciona un módulo" }}
              render={({ field: { onChange } }) => (
                <MultiSelectAll
                  isMulti={false}
                  widthSelect={"9rem"}
                  options={optionsModulos}
                  placeholder="Módulo"
                  error={error.field?.modulo}
                  onChange={(e) => {
                    onChange(e);
                    handleTipoMuestreo(e);
                  }}
                />
              )}
            />
            <Controller
              name="field.participantes"
              control={methods.control}
              rules={{ required: "Seleccione un participante" }}
              render={({ field: { onChange, name, value } }) => (
                <MultiSelectAll
                  asyncSelect
                  cacheOptions
                  loadOptions={students}
                  isMulti={true}
                  defaultOptions={[
                    {
                      estudiante: "Todo el grupo",
                      idEstudiante: "*",
                    },
                    ...students,
                  ]}
                  widthSelect={"20rem"}
                  closeMenuOnSelect={false}
                  getOptionLabel={(option) => option.estudiante}
                  getOptionValue={(option) => option.idEstudiante}
                  placeholder="Participantes"
                  error={error?.field?.participantes}
                  onChange={(e, option) => {
                    onChange(e);
                    getAllMembers(option);
                  }}
                  name={name}
                  value={value}
                />
              )}
            />
          </Row>

          {/* Descripción de la práctica */}
          <Row>
            <TextArea
              error={error.field?.descripcion}
              placeholder="Descripción de la práctica"
              {...methods.register("field.descripcion", {
                required: "Digite una descripción",
              })}
            />
          </Row>

          {/* Se crean los grupos */}
          <PracticeGroup />

          <Row>
            <ButtonActions>
              <Button
                type="button"
                styleButton="secondary"
                onClick={handleExitForm}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                styleButton="primary"
                disabled={numberOfGroupsWatch && !numberOfGroupsWatch.length}
              >
                Publicar
              </Button>
            </ButtonActions>
          </Row>
        </FormStyle>
      </FormProvider>

      <ModalExitForm
        isOpen={exitForm}
        close={handleExitForm}
        onClick={() => history.goBack()}
      />

      {/* Se muestra el modal */}
      {isFormValid && (
        <ModalForm
          isOpen={isOpen}
          close={handleModalState}
          onClick={sendFormValid}
        />
      )}
    </>
  );
};

export default Form;
