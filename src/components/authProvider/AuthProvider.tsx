import React, { useState, createContext, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  autenticado: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [autenticado, setAutenticado] = useState<boolean>(() => {
    const storeAuth = localStorage.getItem("autenticado");
    return storeAuth ? JSON.parse(storeAuth) : false;
  });

  useEffect(()=>{
    localStorage.setItem("autenticado", JSON.stringify(autenticado));
  }, [autenticado]);

  const login = () => {
    setAutenticado(true);
  };

  const logout = () => {
    setAutenticado(false);
    localStorage.removeItem("autenticado")
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
