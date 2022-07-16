import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from "../Context";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const state = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        /* isPrivate && !state.token ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          //   <Navigate to="/login" />
          <Component {...props} />
        ) */
        <Component {...props} />
      }
      {...rest}
    />
  );
};

export default AppRoutes;