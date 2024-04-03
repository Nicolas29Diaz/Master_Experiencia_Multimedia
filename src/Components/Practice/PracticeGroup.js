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
  const { control, modulo, selectedOption, useFieldArray } = useFieldForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groups",
  });

  useEffect(() => {
    remove();
    selectedOption?.groups?.map((item) => {
      append({ producto: "" });
      return "";
    });
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
                      onClick={() => {
                        console.log(index);
                        remove(index);
                      }}
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
