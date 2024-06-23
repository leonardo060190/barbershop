import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Cliente {
  id: string;
  nome: string;
  foto: string;
  // Adicione outras propriedades de Cliente aqui, se necessário
}

interface Barbearia {
  nome: string;
  foto: string;
  // Adicione outras propriedades de Barbearia aqui, se necessário
}
interface User {
  nome?: string;
  cliente?: Cliente;
  barbearia?: Barbearia;
}
interface AuthContextType {
  autenticado: boolean;
  user: User | null;
  login: (user: User) => void;
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

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);

  const startSessionTimer = () => {
    const sessionTimeout = 18000000; //5 horas

    const timer = setTimeout(() => {
      logout();
    }, sessionTimeout);

    setSessionTimer(timer);
  };

  useEffect(() => {
    localStorage.setItem("autenticado", JSON.stringify(autenticado));
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [autenticado, user]);

  const login = (user: User) => {
    setAutenticado(true);
    setUser(user);
    startSessionTimer();
  };

  const logout = () => {
    setAutenticado(false);
    setUser(null);
    localStorage.removeItem("autenticado");
    localStorage.removeItem("user");
    if (sessionTimer) {
      clearTimeout(sessionTimer);
      setSessionTimer(null);
    }
  };

  return (
    <AuthContext.Provider value={{ autenticado, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
