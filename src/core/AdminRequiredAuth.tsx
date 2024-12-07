import React, { PropsWithChildren } from "react";

import { useAdminAuthentication } from "../hooks/adminAuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AdminRequireAuth: React.FC<PropsWithChildren> = (
  props: PropsWithChildren
) => {
  const user = useAdminAuthentication();
  const location = useLocation();
  if (!user.adminAuthData) {
    return <Navigate to="/" state={location.pathname} />;
  }
  return <>{props.children}</>;
};

export default AdminRequireAuth;
