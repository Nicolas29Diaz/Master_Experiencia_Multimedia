import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "hooks/useAuth";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { authenticated, userAuthenticate, isLoading } = useAuth();

  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !authenticated && !isLoading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
