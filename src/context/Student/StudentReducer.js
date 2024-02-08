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
  GET_PRODUCTS_FEATURES_MODULE1,
  GET_PRODUCTS_FEATURES_MODULE2,
  GET_PRODUCTS_FEATURES_MODULE3,
  GET_ACTUAL_SUBGROUP,
  CHECK_SUBGROUP,
  CHANGE_GRAPHIC,
  RESET_SELECTED_SUBGROUP,
  GET_CONDITIONS,
  UPDATE_PRACTICE_STATE,
  GET_PRACTICE_STATE,
  LOADING,
  LOADING_ERROR,
  RESET_SUCCESS,
  RESET_CREATE_PRODUCTS,
  RESET_ALL_STATE_STUDENT,
} from "types";

const StudentReducer = (state, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isloading: payload,
      };

    case LOADING_ERROR:
      return {
        ...state,
        isloading: false,
      };

    case GET_ALL_PRACTICES_STUDENT:
      return {
        ...state,
        practicesStudent: payload,
        isloading: false,
      };
    case GET_ACTUAL_MODULE:
      return {
        ...state,
        modulo: payload,
      };
    case CREATE_INSPECTION_PRODUCT_MODULE1:
    case CREATE_INSPECTION_PRODUCT_MODULE2:
      return {
        ...state,
      };

    case CREATE_INSPECTION_PRODUCT_MODULE3:
      return {
        ...state,
        isCreateProduct: true,
      };

    case CREATE_INSPECTION_PRODUCT_MODULE3_ERROR:
      return {
        ...state,
        isCreateProduct: false,
        isloading: false,
      };

    case RESET_CREATE_PRODUCTS:
      return {
        ...state,
        isCreateProduct: false,
      };

    case GET_PRODUCTS_INSPECTION_MODULE1:
    case GET_PRODUCTS_INSPECTION_MODULE3:
      return {
        ...state,
        products: payload,
      };

    case GET_PRODUCTS_INSPECTION_MODULE2:
      return {
        ...state,
        subgroups: payload,
      };

    case GET_ALL_GRAPHICS:
      return {
        ...state,
        graphics: payload,
      };
    case GET_PRODUCTS_FEATURES_MODULE1:
    case GET_PRODUCTS_FEATURES_MODULE2:
    case GET_PRODUCTS_FEATURES_MODULE3:
      return {
        ...state,
        features: payload,
      };

    case GET_PRACTICE_ID:
      return {
        ...state,
        idPractica: payload,
      };

    case GET_ACTUAL_SUBGROUP:
      return {
        ...state,
        selectedSubgroup: payload,
      };
    case CHECK_SUBGROUP:
      const { groupSelected, idSubgroupSelected, nameArray } = payload;

      const original = { ...state.subgroups };

      const newGroups = state.subgroups[nameArray].map((subgroup) => {
        if (subgroup.id === idSubgroupSelected) {
          subgroup.grupos.map((group) => {
            if (group.id === groupSelected.id) {
              return groupSelected;
            }
            return group;
          });
        }
        return subgroup;
      });

      original[nameArray] = newGroups;

      return {
        ...state,
        subgroups: original,
      };

    case CHANGE_GRAPHIC:
      return {
        ...state,
        typeOfGraphic: payload,
      };

    case RESET_SELECTED_SUBGROUP:
      return {
        ...state,
        selectedSubgroup: null,
      };

    case GET_CONDITIONS: {
      return {
        ...state,
        conditions: payload.productsStudent[0],
        numberProducts: payload.numberProducts,
      };
    }

    case UPDATE_PRACTICE_STATE: {
      return {
        ...state,
        practicesStudent: state.practicesStudent.map((practice) =>
          practice.id === payload ? payload : practice
        ),
        success: true,
      };
    }

    case GET_PRACTICE_STATE: {
      return {
        ...state,
        finish: payload,
      };
    }

    case RESET_SUCCESS: {
      return {
        ...state,
        success: false,
      };
    }

    case RESET_ALL_STATE_STUDENT: {
      return {
        ...state,
        modulo: null,
        typeOfGraphic: null,
        idPractica: null,
        selectedSubgroup: null,
        finish: 0,
        numberProducts: 0,
        isloading: false,
        success: false,
        isCreateProduct: false,
        products: [],
        subgroups: [],
        features: [],
        graphics: [],
        conditions: [],
      };
    }

    default:
      return state;
  }
};

export default StudentReducer;
