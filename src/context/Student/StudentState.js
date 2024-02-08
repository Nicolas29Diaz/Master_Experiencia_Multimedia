import React, { useCallback, useReducer } from "react";
import StudentReducer from "./StudentReducer";
import StudentContext from "./StudentContext";
import {
  GET_ALL_PRACTICES_STUDENT,
  GET_ACTUAL_MODULE,
  GET_PRACTICE_ID,
  CREATE_INSPECTION_PRODUCT_MODULE1,
  CREATE_INSPECTION_PRODUCT_MODULE2,
  CREATE_INSPECTION_PRODUCT_MODULE3,
  CREATE_INSPECTION_PRODUCT_MODULE3_ERROR,
  GET_PRODUCTS_INSPECTION_MODULE1,
  GET_PRODUCTS_INSPECTION_MODULE2,
  GET_PRODUCTS_INSPECTION_MODULE3,
  GET_ALL_GRAPHICS,
  LOADING,
  LOADING_ERROR,
  GET_PRODUCTS_FEATURES_MODULE1,
  GET_PRODUCTS_FEATURES_MODULE2,
  GET_PRODUCTS_FEATURES_MODULE3,
  UPDATE_PRACTICE_STATE,
  GET_PRACTICE_STATE,
  CHECK_SUBGROUP,
  GET_ACTUAL_SUBGROUP,
  CHANGE_GRAPHIC,
  RESET_SELECTED_SUBGROUP,
  GET_CONDITIONS,
  RESET_SUCCESS,
  RESET_CREATE_PRODUCTS,
  RESET_ALL_STATE_STUDENT,
} from "types";

import axiosClient from "config/axios";
import toast from "react-hot-toast";

const StudentState = ({ children }) => {
  const initialState = {
    modulo: null,
    typeOfGraphic: null,
    idPractica: null,
    selectedSubgroup: null,
    finish: 0,
    numberProducts: 0,
    isloading: false,
    success: false,
    isCreateProduct: false,
    practicesStudent: [],
    products: [],
    subgroups: [],
    features: [],
    graphics: [],
    conditions: [],
  };

  const [state, dispatch] = useReducer(StudentReducer, initialState);

  const Loading = () =>
    dispatch({
      type: LOADING,
      payload: true,
    });

  const getAllPracticesStudent = async (idEstudiante) => {
    try {
      Loading();

      const response = await axiosClient.get(
        `api/practicas/practica1/estudiante/${idEstudiante}`
      );

      dispatch({
        type: GET_ALL_PRACTICES_STUDENT,
        payload: response.data.practices,
      });
    } catch (error) {
      dispatch({
        type: LOADING_ERROR,
      });
      console.log(error);
    }
  };

  const getActualModule = useCallback((modulo) => {
    dispatch({
      type: GET_ACTUAL_MODULE,
      payload: modulo,
    });
  }, []);

  // Obtener las caracteristicas de cada producto dependiendo del corte
  const getFeaturesProductC1 = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `api/producto/corte1/caracteristicas/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: GET_PRODUCTS_FEATURES_MODULE1,
        payload: response.data.features,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFeaturesProductC2 = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `api/producto/corte2/caracteristicas/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: GET_PRODUCTS_FEATURES_MODULE2,
        payload: response.data.features,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFeaturesProductC3 = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `api/producto/corte3/caracteristicas/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: GET_PRODUCTS_FEATURES_MODULE3,
        payload: response.data.features,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Creación de los productos a inspeccionar dependiendo del corte
  const createInspectionProductC1 = async (idPractica, idEstudiante) => {
    try {
      await axiosClient.get(
        `api/producto/corte1/referencia/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: CREATE_INSPECTION_PRODUCT_MODULE1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createInspectionProductC2 = async (idPractica, idEstudiante) => {
    try {
      await axiosClient.get(
        `api/producto/corte2/referencia/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: CREATE_INSPECTION_PRODUCT_MODULE2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createInspectionProductC3 = (data) => {
    try {
      const response = axiosClient.post("api/producto/corte3/inspeccion", data);
      toast.promise(response, {
        loading: "Creando productos...",
        success: (res) => {
          dispatch({
            type: CREATE_INSPECTION_PRODUCT_MODULE3,
          });

          return res.data.msg;
        },
        error: (err) => err.response.data.msg,
      });
    } catch (error) {
      dispatch({
        type: CREATE_INSPECTION_PRODUCT_MODULE3_ERROR,
      });
      console.log(error);
    }
  };

  const updatePracticeState = (idPractica, idEstudiante) => {
    try {
      const response = axiosClient.put(
        `/api/estudiante/practica/${idPractica}/estudiante/${idEstudiante}`
      );

      toast.promise(response, {
        loading: "Guardando datos...",
        success: (res) => {
          dispatch({
            type: UPDATE_PRACTICE_STATE,
            payload: res.data.idPractica,
          });

          return "Practica finalizada";
        },

        error: (err) => err.response.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPracticeState = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `/api/estudiante/practica/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: GET_PRACTICE_STATE,
        payload: response.data.state[0].finalizado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getGraphics = useCallback(async (idPractica) => {
    try {
      const response = await axiosClient.get(
        `api/producto/corte2/graficos/${idPractica}`
      );

      dispatch({
        type: GET_ALL_GRAPHICS,
        payload: response.data.graficos,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Obtener los productos de cada practica dependiendo del corte
  const getProductsPracticeOne = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `api/producto/corte1/inspeccion/${idPractica}/estudiante/${idEstudiante}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      dispatch({
        type: GET_PRODUCTS_INSPECTION_MODULE1,
        payload: response.data.productsArray[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsPracticeTwo = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `api/producto/corte2/inspeccion/${idPractica}/estudiante/${idEstudiante}/subgrupo`
      );

      dispatch({
        type: GET_PRODUCTS_INSPECTION_MODULE2,
        payload: response.data.productsSubgroup,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsPracticeThree = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `api/producto/corte3/inspeccion/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: GET_PRODUCTS_INSPECTION_MODULE3,
        payload: response.data.productsArray[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPracticeId = (idPractica) => {
    dispatch({
      type: GET_PRACTICE_ID,
      payload: idPractica,
    });
  };

  const getSubgroup = (subgroup) => {
    dispatch({
      type: GET_ACTUAL_SUBGROUP,
      payload: subgroup,
    });
  };

  const getConditions = async (idPractica, idEstudiante) => {
    try {
      const response = await axiosClient.get(
        `/api/producto/corte3/referencia/${idPractica}/estudiante/${idEstudiante}`
      );

      dispatch({
        type: GET_CONDITIONS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkSubgroup = (groupSelected, idSubgroupSelected, nameArray) => {
    dispatch({
      type: CHECK_SUBGROUP,
      payload: { groupSelected, idSubgroupSelected, nameArray },
    });
  };

  const changeGraphic = useCallback((graphic) => {
    dispatch({
      type: CHANGE_GRAPHIC,
      payload: graphic,
    });
  }, []);

  const resetSelectedSubgroup = () => {
    dispatch({
      type: RESET_SELECTED_SUBGROUP,
    });
  };

  const resetSuccess = () => {
    dispatch({
      type: RESET_SUCCESS,
    });
  };

  const resetCreateProducts = () => {
    dispatch({
      type: RESET_CREATE_PRODUCTS,
    });
  };
  const resetAllState = () => {
    dispatch({
      type: RESET_ALL_STATE_STUDENT,
    });
  };
  return (
    <StudentContext.Provider
      value={{
        idPractica: state.idPractica,
        modulo: state.modulo,
        isloading: state.isloading,
        typeOfGraphic: state.typeOfGraphic,
        practicesStudent: state.practicesStudent,
        products: state.products,
        graphics: state.graphics,
        subgroups: state.subgroups,
        features: state.features,
        selectedSubgroup: state.selectedSubgroup,
        conditions: state.conditions,
        finish: state.finish,
        success: state.success,
        numberProducts: state.numberProducts,
        isCreateProduct: state.isCreateProduct,
        getAllPracticesStudent,
        getActualModule,
        createInspectionProductC1,
        createInspectionProductC2,
        createInspectionProductC3,
        getProductsPracticeOne,
        getProductsPracticeTwo,
        getProductsPracticeThree,
        updatePracticeState,
        getGraphics,
        getPracticeId,
        getFeaturesProductC1,
        getFeaturesProductC2,
        getFeaturesProductC3,
        getSubgroup,
        checkSubgroup,
        changeGraphic,
        resetSelectedSubgroup,
        getConditions,
        getPracticeState,
        resetSuccess,
        resetCreateProducts,
        resetAllState,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentState;
