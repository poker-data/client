import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from "../Context";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const state = useAuthState();
  //console.log("token", state.token);
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