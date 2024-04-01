import React, { Fragment } from "react";

// hooks
import useFieldForm from "hooks/useFieldForm";
// Components
import MultiSelectAll from "Components/MultiSelectAll";
import SelectedProductGroup from "Components/Groups/SelectedProductGroup";
import CoursesGroup from "./CoursesGroup";
// Data
import { CORTE1, CORTE2, optionsNameProduct } from "constants/index";
// Validations
import { Validations } from "Validations/Validation";
import { useEffect } from "react";

const GenerateProductGroup = ({ id }) => {
  const {
    Controller,
    watch,
    modulo,
    errors,
    selectedOption,
    setValue,
    getValues,
  } = useFieldForm();
  const selectedProduct = watch(`groups.${id}.producto`);
  const { validationField } = Validations();

  useEffect(() => {
    selectedOption?.groups?.find((gruop) => {
      gruop.id === id &&
        setValue(`groups.${id}.producto`, {
          value: gruop.value,
          label: gruop.label,
        });
      return "";
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment key={id}>
      <Controller
        name={`groups.${id}.producto`}
        rules={validationField.producto}
        render={({ field }) => (
          <MultiSelectAll
            isMulti={false}
            widthSelect={"10rem"}
            options={optionsNameProduct}
            placeholder="Seleccionar producto"
            error={errors?.groups?.[id]?.producto}
            value={optionsNameProduct.find(
              (product) =>
                product.value === getValues(`groups.${id}.producto`)?.value
            )} // Seleccionar automáticamente el módulo correspondiente al valor del campo modulo
            {...field}
          />
        )}
      />

      {/* Muestra los campos que se requiere para crear la práctica  */}
      {modulo?.value === CORTE1 && (
        <CoursesGroup coursesGroup={CORTE1} id={id} />
      )}

      {modulo?.value === CORTE2 && (
        <CoursesGroup coursesGroup={CORTE2} id={id} />
      )}

      {selectedProduct?.label && (
        <SelectedProductGroup selectedProduct={selectedProduct.label} id={id} />
      )}
    </Fragment>
  );
};

export default GenerateProductGroup;
