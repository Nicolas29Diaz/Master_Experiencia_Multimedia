import { useContext, useMemo } from "react";
import StudentContext from "context/Student/StudentContext";
import {
  CORTE1,
  CORTE2,
  CORTE3,
  RANDOM,
  CONSTANT,
  VARIABLE,
} from "constants/index";

const useStudent = () => {
  const studentContext = useContext(StudentContext);

  const {
    practicesStudent,
    products,
    features,
    modulo,
    idPractica,
    typeOfGraphic,
    subgroups,
    finish,
    conditions,
    getSubgroup,
    selectedSubgroup,
    isloading,
    checkSubgroup,
    changeGraphic,
    resetSelectedSubgroup,
    getConditions,

    graphics,
    getGraphics,
    getFeaturesProductC1,
    getFeaturesProductC2,
    getFeaturesProductC3,
    getAllPracticesStudent,
    getActualModule,
    createInspectionProductC1,
    createInspectionProductC2,
    createInspectionProductC3,
    getProductsPracticeOne,
    getProductsPracticeTwo,
    getProductsPracticeThree,
    getPracticeId,
    updatePracticeState,
    getPracticeState,
    success,
    resetSuccess,
    numberProducts,
    resetCreateProducts,
    isCreateProduct,
    resetAllState,
  } = studentContext;

  const getArrayDependOnGraphic = useMemo(
    () => ({
      [RANDOM]: subgroups.AtributoNAleatorio,
      [CONSTANT]: subgroups.AtributoNConstante,
      [VARIABLE]: subgroups.AtributoNVariable,
    }),
    [
      subgroups.AtributoNAleatorio,
      subgroups.AtributoNConstante,
      subgroups.AtributoNVariable,
    ]
  );

  const keysArrayGraphic = Object.entries(getArrayDependOnGraphic)
    .filter(([_, value]) => value?.length > 0)
    .map(([key, _]) => key);

  const arraySubgroupSelectedByGraphic =
    typeOfGraphic && getArrayDependOnGraphic[typeOfGraphic];

  const selectedArrayByModule = useMemo(
    () => ({
      [CORTE1]: products.products,
      [CORTE2]: selectedSubgroup && selectedSubgroup.grupos,
      [CORTE3]: products.products,
    }),
    [products.products, selectedSubgroup]
  );

  const CURRENT_ARRAY = selectedArrayByModule[modulo];

  return {
    practicesStudent,
    products,
    features,
    modulo,
    idPractica,
    typeOfGraphic,
    subgroups,
    conditions,
    finish,
    getConditions,
    getSubgroup,
    selectedSubgroup,
    isloading,
    checkSubgroup,
    changeGraphic,
    getArrayDependOnGraphic,
    arraySubgroupSelectedByGraphic,
    CURRENT_ARRAY,
    resetSelectedSubgroup,

    graphics,
    getGraphics,
    getFeaturesProductC1,
    getFeaturesProductC2,
    getFeaturesProductC3,
    getAllPracticesStudent,
    getActualModule,
    createInspectionProductC1,
    createInspectionProductC2,
    createInspectionProductC3,
    getProductsPracticeOne,
    getProductsPracticeTwo,
    getProductsPracticeThree,
    getPracticeId,
    updatePracticeState,
    getPracticeState,
    keysArrayGraphic,
    success,
    resetSuccess,
    numberProducts,
    resetCreateProducts,
    isCreateProduct,
    resetAllState,
  };
};

export default useStudent;
