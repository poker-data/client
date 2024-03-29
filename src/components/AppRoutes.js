import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from "../context";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const state = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !state.token ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          //   <Navigate to="/login" />
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;