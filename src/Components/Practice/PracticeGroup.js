import React, { Fragment } from "react";

import useFieldForm from "hooks/useFieldForm";

// Styles
import { Row, Title } from "Components/Form/styles";

// Components
import Courses from "Components/Courses";
import GenerateProductGroup from "Components/Groups/GenerateProductGroup";
import Button from "Components/Button";

import { CORTE2, CORTE3 } from "constants/index";
import { useEffect } from "react";

const PracticeGroup = () => {
  const { control, modulo, selectedOption, useFieldArray, setValue } =
    useFieldForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groups",
  });

  const setDefaultValues = () => {
    selectedOption?.groups.forEach((group, index) => {
      setValue(`groups.${index}.producto`, {
        value: group.value,
        label: group.label,
      });
      if (selectedOption.module.value === 1) {
        setValue(`groups.${index}.unidades`, group.units);
      }
      if (selectedOption.module.value === 2) {
        setValue(`groups.${index}.subgrupo`, group.subGroup);
        setValue(`groups.${index}.tamanioSubgrupo`, group.sizeSubGroup);
      }
      if (selectedOption.module.value === 3) {
        setValue(`groups.${index}.lote`, group.lot);
        setValue(`groups.${index}.aql`, group.aql);
        setValue(`groups.${index}.severidad`, group.severity);
        setValue(`groups.${index}.nivelInspeccion`, group.inspectionLevel);
        selectedOption.typeSampling === "variable" &&
          setValue(`groups.${index}.metodo`, group.method);
      }

      setValue(`groups.${index}.atributos`, group.attribute);
      setValue(`groups.${index}.cont`, group.optionsProducto);
      setValue(`groups.${index}.tolerancia`, group.tolerance);
    });
  };

  useEffect(() => {
    remove();

    selectedOption?.groups?.map((item) => {
      append({ producto: "" });
      return "";
    });

    setDefaultValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <>
      {modulo?.label === undefined ? (
        <p>Debes seleccionar un módulo</p>
      ) : (
        <>
          <Title>Crea los grupos para la práctica</Title>
          <Row>
            <Button
              type="button"
              styleButton="primary"
              onClick={() => {
                append({ producto: "" });
              }}
            >
              Añadir nuevo grupo
            </Button>

            {modulo?.value === CORTE2 && <Courses course={CORTE2} />}
          </Row>
          <Row>{modulo?.value === CORTE3 && <Courses course={CORTE3} />}</Row>

          {fields?.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <Row group>
                  <>
                    <p>Grupo {index + 1}</p>
                    <GenerateProductGroup id={index} />
                    <Button
                      type="button"
                      styleButton="delete"
                      onClick={() => remove(index)}
                    >
                      Eliminar
                    </Button>
                  </>
                </Row>
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

export default PracticeGroup;
