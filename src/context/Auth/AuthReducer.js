import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_OFF,
} from "types/index";
const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        authenticated: true,
        isLoading: false,
      };

    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: payload,
        isLoading: false,
      };
    case SIGN_OFF:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
