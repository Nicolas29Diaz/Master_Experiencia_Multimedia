import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_OFF,
} from "types/index";

import axiosClient from "config/axios";
import tokenAuth from "config/tokenAuth";
import toast from "react-hot-toast";
const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async (data) => {
    try {
      const response = await axiosClient.post("/api/usuario/register", data);
      // Mensaje de exito
      toast.success("Usuario creado con exito");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.token,
      });

      //   Obtener el usuario
      userAuthenticate();
    } catch (error) {
      console.log(error);
      // Mensaje de error
      toast.error(error.response.data.msg, { duration: 3000 });
      dispatch({
        type: REGISTER_ERROR,
      });
    }
  };

  // Cierra la sesión del usuario
  const signOff = () => {
    dispatch({
      type: SIGN_OFF,
    });
  };

  const userAuthenticate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //   Cunado el usuaro inicia sesión

  const Login = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth", data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token,
      });
      //   Obtener el usuario
      userAuthenticate();
    } catch (error) {
      console.log(error);
      // Mensaje de error
      toast.error(error.response.data.msg, { duration: 3000 });
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        isLoading: state.isLoading,
        registerUser,
        Login,
        userAuthenticate,
        signOff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
