import useFieldForm from "hooks/useFieldForm";
import { WrapperRadio, Row } from "Components/Form/styles";
import { CORTE1, CORTE2, CORTE3, optionsGraficos } from "constants/index";
// Components
import RadioButton from "Components/RadioButton";
import MultiSelectAll from "Components/MultiSelectAll";

import { Validations } from "Validations/Validation";

const Courses = ({ course }) => {
  const { Controller, control, register, errors } = useFieldForm();
  const { validationField } = Validations();

  const Course2 = () => (
    <Row>
      <Controller
        name="field.graficos"
        control={control}
        rules={validationField.graficos}
        shouldUnregister={CORTE1 || CORTE3}
        render={({ field }) => (
          <MultiSelectAll
            isMulti={true}
            widthSelect={"21.7rem"}
            closeMenuOnSelect={true}
            placeholder="Seleccionar gráficos"
            options={optionsGraficos}
            error={errors.field?.graficos}
            {...field}
          />
        )}
      />
    </Row>
  );

  const Course3 = () => (
    <WrapperRadio>
      <p>Tipo de muestreo:</p>
      <RadioButton
        id="variables"
        value="variable"
        text="Variables"
        error={errors.field?.tipoMuestreo}
        {...register("field.tipoMuestreo", {
          ...validationField.tipoMuestreo,
          shouldUnregister: CORTE1 || CORTE2,
        })}
      />
      <RadioButton
        id="atributos"
        value="atributo"
        text="Atributos"
        error={errors.field?.tipoMuestreo}
        {...register("field.tipoMuestreo", {
          ...validationField.tipoMuestreo,
          shouldUnregister: CORTE1 || CORTE2,
        })}
      />
    </WrapperRadio>
  );

  return (
    <>
      {course === CORTE2 && Course2()}
      {course === CORTE3 && Course3()}
    </>
  );
};

export default Courses;
