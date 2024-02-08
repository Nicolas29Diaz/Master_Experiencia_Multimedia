import { useContext } from "react";
import AuthContext from "context/Auth/AuthContext";
const useAuth = () => {
  const authContext = useContext(AuthContext);

  const {
    user,
    authenticated,
    isLoading,
    registerUser,
    userAuthenticate,
    Login,
    signOff,
  } = authContext;

  return {
    user,
    authenticated,
    isLoading,
    registerUser,
    userAuthenticate,
    Login,
    signOff,
  };
};

export default useAuth;
