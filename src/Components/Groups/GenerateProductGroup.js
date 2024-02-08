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

const GenerateProductGroup = ({ id }) => {
  const { Controller, watch, modulo, errors } = useFieldForm();
  const selectedProduct = watch(`groups.${id}.producto`);
  const { validationField } = Validations();

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
