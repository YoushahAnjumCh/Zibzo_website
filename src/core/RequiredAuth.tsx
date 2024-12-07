import React, { PropsWithChildren } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useAuthentication } from "../hooks/authContext";

const RequireAuth: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const user = useAuthentication();
  const location = useLocation();
  if (!user.authData) {
    return <Navigate to="/" state={location.pathname} />;
  }
  return <>{props.children}</>;
};

export default RequireAuth;
