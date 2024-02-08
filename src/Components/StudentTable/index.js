import React, { useEffect, useState } from "react";
import {
  StudentTableMainContainer,
  ContainerSelect,
  Table,
  TableContainer,
} from "./styles";
import MultiselectAll from "Components/MultiSelectAll";
import useStudent from "hooks/useStudent";
import {
  ATTRIBUTES_NAMES,
  CORTE1,
  CORTE2,
  VARIABLE_PRIMARIA,
  VARIABLE_SECUNDARIA,
  MODULE_PRACTICE,
  CORTE3,
} from "constants/index";
import useAuth from "hooks/useAuth";
import { useLocation } from "react-router-dom";

const StudentTable = () => {
  const { pathname } = useLocation();
  const urlModule = pathname.split("/")[5];
  const selectedModule = MODULE_PRACTICE[urlModule];
  const {
    products,
    modulo,
    subgroups,
    getProductsPracticeOne,
    getProductsPracticeTwo,
    getProductsPracticeThree,
    idPractica,
    getActualModule,
  } = useStudent();
  const { user } = useAuth();

  const entries = Object.entries(subgroups)
    .filter(([key, value]) => key.startsWith("Atributo") && value.length > 0)
    .flat();

  // Obtiene los nombres de los arreglos
  const getNamesarrayList = entries.filter((sub) => typeof sub === "string");
  // Obtiene los subgrupos de cada arreglo
  const getValuesarrayList = entries.filter((sub) => typeof sub !== "string");

  // Muestra los tipos de muestreo que tiene la práctica
  const options = getNamesarrayList.map((option) => {
    return { label: ATTRIBUTES_NAMES[option], value: option };
  });
  const [tipoMuestreo, setTipoMuestreo] = useState("");
  const [subGroupTitle, setsubGroupTitle] = useState("");

  useEffect(() => {
    if (modulo === CORTE1) {
      getProductsPracticeOne(idPractica, user?.estudiante?.idEstudiante);
    }
    if (modulo === CORTE2) {
      getProductsPracticeTwo(idPractica, user?.estudiante?.idEstudiante);
    }
    if (modulo === CORTE3) {
      getProductsPracticeThree(idPractica, user?.estudiante?.idEstudiante);
    }
    // eslint-disable-next-line
  }, [idPractica, user?.estudiante.idEstudiante, modulo]);

  useEffect(() => {
    if (!modulo) {
      getActualModule(selectedModule);
    }

    if (
      modulo === CORTE2 &&
      (tipoMuestreo === "" || tipoMuestreo === undefined)
    ) {
      setTipoMuestreo(getNamesarrayList[0]);
      setsubGroupTitle(getValuesarrayList?.[0]?.[0].title);
    }
  }, [
    getActualModule,
    tipoMuestreo,
    getNamesarrayList,
    getValuesarrayList,
    modulo,
    selectedModule,
  ]);

  const selectSubgroups =
    tipoMuestreo === ""
      ? subgroups[getNamesarrayList[0]]
      : subgroups[tipoMuestreo];

  const arrayListSelectedSubgroup = subgroups[tipoMuestreo]?.filter(
    (sub) => sub.title === subGroupTitle
  );

  const handleOnChange = (value, e) => {
    setTipoMuestreo(value.value);
  };

  const handleOnChange2 = (value, e) => {
    setsubGroupTitle(value.title);
  };

  const isEqualVariable = tipoMuestreo === "AtributoNVariable";

  const listProducts =
    products.products &&
    products.products.map((product) => {
      const primaryVariable = VARIABLE_PRIMARIA(product.nombre);
      const variableSecondary = VARIABLE_SECUNDARIA[product.nombre];
      const separateComma = product.atributos.split(",").join(", ");
      return {
        Nombre: product.nombre,
        ...(product.variablePrincipal !== undefined && {
          [primaryVariable]: product.variablePrincipal,
        }),

        ...(product.variableSecundaria !== undefined && {
          [variableSecondary]: product.variableSecundaria,
        }),
        Atributos: separateComma,
        ...((product.estado === 1 || product.estado === 0) && {
          Estado: product.estado === 1 ? "Aceptado" : "Rechazado",
        }),
      };
    });

  const listSubgroup =
    arrayListSelectedSubgroup &&
    arrayListSelectedSubgroup
      .map(({ grupos }) => {
        return grupos.map((grupo) => {
          const primaryVariable = VARIABLE_PRIMARIA(grupo.nombre);
          const variableSecondary = VARIABLE_SECUNDARIA[grupo.nombre];
          const separateComma = grupo.atributos.split(",").join(", ");
          return {
            Nombre: grupo.nombre,
            ...(isEqualVariable && {
              [primaryVariable]: grupo.variablePrincipal,
            }),
            ...(grupo.variableSecundaria !== undefined && {
              [variableSecondary]: grupo.variableSecundaria,
            }),
            Atributos: separateComma,
          };
        });
      })
      .flat();

  const titles =
    (modulo === CORTE1 || modulo === CORTE3) &&
    listProducts?.[0] &&
    Object.keys(listProducts[0]);

  const titleSubgroups =
    modulo === CORTE2 && listSubgroup?.[0] && Object.keys(listSubgroup[0]);

  const renderTitles = ({ arrayList, titles }) => (
    <>
      <thead>
        <tr>
          {arrayList &&
            arrayList[0] &&
            titles.map((title, index) => <th key={index}>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {arrayList &&
          arrayList.map((row, index) => (
            <tr key={index}>
              {titles.map((column, index) => (
                <td key={index}>{row[column]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </>
  );

  return (
    <StudentTableMainContainer>
      {modulo === CORTE2 && options.length > 0 && (
        <ContainerSelect>
          <MultiselectAll
            isMulti={false}
            options={options}
            defaultValue={options[0]}
            placeholder="Selecciona tipo de subgrupo"
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={handleOnChange}
          />
          <MultiselectAll
            isMulti={false}
            options={selectSubgroups}
            defaultValue={selectSubgroups?.[0]}
            placeholder="Selecciona un subgrupo"
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option.id}
            onChange={handleOnChange2}
          />
        </ContainerSelect>
      )}

      <TableContainer>
        <Table>
          {(modulo === CORTE1 || modulo === CORTE3) &&
            renderTitles({ arrayList: listProducts, titles })}
          {modulo === CORTE2 &&
            renderTitles({ arrayList: listSubgroup, titles: titleSubgroups })}
        </Table>
      </TableContainer>
    </StudentTableMainContainer>
  );
};

export default StudentTable;
