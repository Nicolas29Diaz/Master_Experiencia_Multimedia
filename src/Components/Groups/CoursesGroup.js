import React from "react";
// hooks
import useFieldForm from "hooks/useFieldForm";
// Components
import MultiSelectAll from "Components/MultiSelectAll";
import TextField from "Components/TextField";
// Validations
import { Validations } from "Validations/Validation";

// Data
import {
  ATRIBUTO,
  CORTE1,
  CORTE2,
  CORTE3,
  optionsAQL,
  optionsMetodo,
  optionsSeveridad,
  optionsSeveridadAtributos,
  optionsSeveridadVariable,
  VARIABLE,
  SIZE_FIELD,
} from "constants/index";

const CoursesGroup = ({ coursesGroup, id }) => {
  const { Controller, register, control, tipoMuestreo, errors } =
    useFieldForm();

  const { validationField } = Validations();

  const Corte1 = () => (
    <TextField
      type="number"
      width={SIZE_FIELD}
      placeholder="Unidades"
      {...register(`groups.${id}.unidades`, {
        min: {
          message: "Mínimo 4",
          value: 4,
        },
        ...validationField.unidades,
        valueAsNumber: true,
      })}
      error={errors?.groups?.[id]?.unidades}
    />
  );

  const Corte2 = () => (
    <>
      <TextField
        type="number"
        width={SIZE_FIELD}
        placeholder="Subgrupos"
        error={errors?.groups?.[id]?.subgrupo}
        {...register(`groups.${id}.subgrupo`, {
          ...validationField.subgrupo,
          shouldUnregister: CORTE1 || CORTE2,
        })}
      />

      <TextField
        type="number"
        width={SIZE_FIELD}
        placeholder="Tamaño Subg"
        error={errors?.groups?.[id]?.tamanioSubgrupo}
        {...register(`groups.${id}.tamanioSubgrupo`, {
          ...validationField.tamanioSubgrupo,
          valueAsNumber: true,
          shouldUnregister: CORTE1 || CORTE2,
        })}
      />
    </>
  );

  const Corte3 = () => (
    <>
      <TextField
        type="number"
        width={SIZE_FIELD}
        placeholder="Tamaño lote"
        error={errors?.groups?.[id]?.lote}
        {...register(`groups.${id}.lote`, {
          ...validationField.lote,
          valueAsNumber: true,
          shouldUnregister: CORTE1 || CORTE2,
        })}
      />
      <Controller
        name={`groups.${id}.aql`}
        control={control}
        rules={validationField.aql}
        shouldUnregister={CORTE1 || CORTE2}
        render={({ field }) => (
          <MultiSelectAll
            isMulti={false}
            widthSelect={SIZE_FIELD}
            placeholder="AQL"
            options={optionsAQL}
            error={errors?.groups?.[id]?.aql}
            {...field}
          />
        )}
      />

      <Controller
        name={`groups.${id}.severidad`}
        control={control}
        rules={validationField.severidad}
        shouldUnregister={CORTE1 || CORTE2}
        render={({ field }) => (
          <MultiSelectAll
            isMulti={false}
            widthSelect={SIZE_FIELD}
            placeholder="Severidad"
            options={optionsSeveridad}
            error={errors?.groups?.[id]?.severidad}
            {...field}
          />
        )}
      />

      <Controller
        name={`groups.${id}.nivelInspeccion`}
        control={control}
        rules={validationField.nivelInspeccion}
        shouldUnregister={CORTE1 || CORTE2}
        render={({ field }) => (
          <MultiSelectAll
            isMulti={false}
            widthSelect={SIZE_FIELD}
            placeholder="N. Insp"
            options={
              tipoMuestreo && tipoMuestreo === ATRIBUTO
                ? optionsSeveridadAtributos
                : optionsSeveridadVariable
            }
            error={errors?.groups?.[id]?.nivelInspeccion}
            {...field}
          />
        )}
      />

      {tipoMuestreo === VARIABLE && (
        <Controller
          name={`groups.${id}.metodo`}
          control={control}
          rules={validationField.metodo}
          shouldUnregister={CORTE1 || CORTE2}
          render={({ field }) => (
            <MultiSelectAll
              isMulti={true}
              widthSelect={"12rem"}
              placeholder="Método"
              options={optionsMetodo}
              error={errors?.groups?.[id]?.metodo}
              {...field}
            />
          )}
        />
      )}
    </>
  );

  return (
    <>
      {coursesGroup === CORTE1 && Corte1()}
      {coursesGroup === CORTE2 && Corte2()}
      {coursesGroup === CORTE3 && Corte3()}
    </>
  );
};

export default CoursesGroup;
