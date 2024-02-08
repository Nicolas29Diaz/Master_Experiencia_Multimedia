import Modal from "Components/Modal";
import React, { useEffect } from "react";
import TextField from "Components/TextField";
import Button from "Components/Button";
import { useForm } from "react-hook-form";
import { FieldModal, Actions } from "./styles";
import useTeacher from "hooks/useTeacher";

const ModalEditCourse = ({ isOpen, close }) => {
  const { course, updateCourse } = useTeacher();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      nombreCurso: course?.nombreCurso,
      periodoAcademico: course?.periodoAcademico,
    });
  }, [course, reset]);

  const onSubmitCourse = (data) => {
    console.log(data);
    updateCourse(course.idCurso, data);
    // createNewCourse(data);
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
      <h1>Editando curso...</h1>

      <form onSubmit={handleSubmit(onSubmitCourse)}>
        <FieldModal>
          <TextField
            type="text"
            width="100%"
            placeholder="Nombre del curso"
            maxLength={25}
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
            Guardar cambios
          </Button>
        </Actions>
      </form>
    </Modal>
  );
};

export default ModalEditCourse;
