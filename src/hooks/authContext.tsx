import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthModel } from "../features/redux/auth/model/auth.model";

interface AuthContextType {
  authData: AuthModel | null;
  setAuthData: (data: AuthModel | null) => void;
  clearAuthData: () => void; // Add clear function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<AuthModel | null>(() => {
    const storedData = localStorage.getItem("authData");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem("authData", JSON.stringify(authData));
    } else {
      localStorage.removeItem("authData");
    }
  }, [authData]);

  const clearAuthData = () => {
    setAuthData(null); // Clear state
    localStorage.removeItem("authData"); // Clear local storage
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
