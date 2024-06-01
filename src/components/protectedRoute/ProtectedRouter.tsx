import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authProvider/AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { autenticado } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!autenticado) {
      navigate("/home");
    }
  }, [autenticado, navigate]);

  if (!autenticado) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
