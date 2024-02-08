import React, { Fragment } from "react";
import useFieldForm from "hooks/useFieldForm";
// Components
import TextField from "Components/TextField";
import MultiSelectAll from "Components/MultiSelectAll";
import CoursesGroup from "./CoursesGroup";
// Validations
import { Validations } from "Validations/Validation";

// Data
import {
  ATRIBUTO,
  CORTE1,
  CORTE2,
  CORTE3,
  optionsProducto,
  SIZE_FIELD,
  VARIABLE,
} from "constants/index";

const SelectedProductGroup = ({ selectedProduct, id }) => {
  const {
    Controller,
    register,
    control,
    tipoMuestreo,
    modulo,
    errors,
    setValue,
    participantes,
    watch,
  } = useFieldForm();

  const { validationField } = Validations();

  const filterNames = watch("groups.filterNames");

  function populateFilterNames(value) {
    const selectedCurrentOptions = value.map(({ estudiante }) => estudiante);
    setValue("groups.filterNames", [
      ...(filterNames ?? []).slice(0, id),
      selectedCurrentOptions,
      ...(filterNames ?? []).slice(id + 1),
    ]);
  }

  return optionsProducto
    .filter((product) => product.label === selectedProduct)
    .map((productSelected) => {
      return (
        <Fragment key={id}>
          {(modulo?.value === CORTE1 ||
            modulo?.value === CORTE2 ||
            (modulo?.value === CORTE3 && tipoMuestreo !== ATRIBUTO)) && (
            <>
              <Controller
                name={`groups.${id}.cont`}
                control={control}
                rules={validationField.cont}
                shouldUnregister={tipoMuestreo === VARIABLE}
                render={({ field }) => (
                  <MultiSelectAll
                    widthSelect={SIZE_FIELD}
                    placeholder={productSelected.placeholder}
                    options={productSelected.contOptions}
                    {...field}
                    error={errors?.groups?.[id]?.cont}
                  />
                )}
              />

              <TextField
                type="number"
                width={SIZE_FIELD}
                placeholder="Tolerancia"
                error={errors?.groups?.[id]?.tolerancia}
                {...register(`groups.${id}.tolerancia`, {
                  ...validationField.tolerancia,
                  valueAsNumber: true,
                  shouldUnregister: tipoMuestreo === VARIABLE,
                })}
              />
            </>
          )}

          {/* Crea los campos necesarios para el corte 3 */}
          {modulo?.value === CORTE3 && (
            <CoursesGroup coursesGroup={CORTE3} id={id} />
          )}

          {(modulo?.value === CORTE1 ||
            modulo?.value === CORTE2 ||
            (modulo?.value === CORTE3 && tipoMuestreo === ATRIBUTO)) && (
            <Controller
              name={`groups.${id}.atributos`}
              control={control}
              rules={validationField.atributos}
              shouldUnregister={tipoMuestreo === ATRIBUTO}
              render={({ field }) => (
                <MultiSelectAll
                  widthSelect={"17rem"}
                  isMulti={true}
                  closeMenuOnSelect={false}
                  options={productSelected.attributes}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Atributos"
                  error={errors?.groups?.[id]?.atributos}
                  {...field}
                />
              )}
            />
          )}
          <Controller
            name={`groups.${id}.integrantes`}
            control={control}
            rules={validationField.integrantes}
            render={({ field: { onChange, name, value } }) => (
              <MultiSelectAll
                options={
                  filterNames !== undefined
                    ? participantes.filter(
                        (integrante) =>
                          !filterNames?.flat().includes(integrante.estudiante)
                      )
                    : participantes
                }
                isMulti={true}
                widthSelect={"20rem"}
                closeMenuOnSelect={false}
                getOptionLabel={(option) => option.estudiante}
                getOptionValue={(option) => option.idEstudiante}
                placeholder="Integrantes"
                error={errors?.groups?.[id]?.integrantes}
                onChange={(value) => {
                  onChange(value);
                  populateFilterNames(value);
                }}
                name={name}
                value={value}
              />
            )}
          />
        </Fragment>
      );
    });
};

export default SelectedProductGroup;
