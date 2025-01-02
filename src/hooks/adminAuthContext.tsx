import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthModel } from "../features/redux/auth/model/auth.model";

interface AdminAuthContextType {
  adminAuthData: AuthModel | null;
  adminSetAuthData: (data: AuthModel | null) => void;
  adminClearAuthData: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adminAuthData, adminSetAuthData] = useState<AuthModel | null>(() => {
    const adminStoredData = localStorage.getItem("adminAuthData");
    return adminStoredData ? JSON.parse(adminStoredData) : null;
  });

  useEffect(() => {
    if (adminAuthData) {
      localStorage.setItem("adminAuthData", JSON.stringify(adminAuthData));
    } else {
      localStorage.removeItem("adminAuthData");
    }
  }, [adminAuthData]);

  const adminClearAuthData = () => {
    adminSetAuthData(null);
    localStorage.removeItem("adminAuthData");
  };

  return (
    <AdminAuthContext.Provider
      value={{ adminAuthData, adminSetAuthData, adminClearAuthData }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuthentication = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
