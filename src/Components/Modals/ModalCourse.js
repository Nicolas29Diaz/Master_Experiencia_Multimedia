import Modal from "Components/Modal";
import React from "react";
import TextField from "Components/TextField";
import Button from "Components/Button";
import { useForm } from "react-hook-form";
import { FieldModal, Actions } from "./styles";
import useTeacher from "hooks/useTeacher";

const ModalCourse = ({ isOpen, close }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createNewCourse } = useTeacher();

  const onSubmitCourse = (data) => {
    createNewCourse(data);
    close();
  };

  const val = watch("periodoAcademico");

  // Inserta un guión cada 4 caracteres
  function getFourNumbers(value) {
    value = value.split("-").join("");
    let finalVal = value.match(/.{1,4}/g).join("-");

    return finalVal;
  }

  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>¿Listo para crear un nuevo curso?</h1>
      <p>Ingresa en el siguiente campo el nombre de tu nuevo curso</p>

      <form onSubmit={handleSubmit(onSubmitCourse)}>
        <FieldModal>
          <TextField
            type="text"
            width="100%"
            maxLength={25}
            placeholder="Nombre del curso"
            error={errors?.nombreCurso}
            {...register("nombreCurso", {
              shouldUnregister: isOpen,
              required: "Ingrese el nombre del grupo",
            })}
          />
        </FieldModal>
        <FieldModal>
          <TextField
            type="text"
            width="100%"
            placeholder="Periodo académico"
            error={errors?.periodoAcademico}
            value={val && getFourNumbers(val)}
            maxLength={7}
            {...register("periodoAcademico", {
              shouldUnregister: isOpen,
              pattern: {
                value: /[0-9-]{7}/,
                message: "Escriba así yyyy/mm",
              },
              required: "Ingrese el periodo academico",
            })}
          />
        </FieldModal>

        <Actions>
          <Button type="button" styleButton="secondary" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" styleButton="primary">
            Crear curso
          </Button>
        </Actions>
      </form>
    </Modal>
  );
};

export default ModalCourse;
