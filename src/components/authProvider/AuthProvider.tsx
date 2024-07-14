import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

interface Cliente {
  id?: string;
  nome: string;
  foto: string;
  perfil: string;
}

interface Barbearia {
  id: string;
  nome: string;
  foto: string;
  perfil: string;
  // Adicione outras propriedades de Barbearia aqui, se necessário
}
interface User {
  nome?: string;
  cliente: Cliente;
  barbearia?: Barbearia;
}
interface AuthContextType {
  autenticado: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
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
  const [isTabClosed, setIsTabClosed] = useState(false);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    setAutenticado(false);
    setUser(null);
    localStorage.removeItem("autenticado");
    localStorage.removeItem("user");
    if (sessionTimer) {
      clearTimeout(sessionTimer);
      setSessionTimer(null);
    }
  }, [sessionTimer]);

  const startSessionTimer = useCallback(() => {
    const sessionTimeout = 18000000; //5 horas

    const timer = setTimeout(() => {
      logout();
    }, sessionTimeout);

    setSessionTimer(timer);
  }, [logout]);

  useEffect(() => {
    localStorage.setItem("autenticado", JSON.stringify(autenticado));
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [autenticado, user]);

  const login = useCallback(
    (user: User) => {
      setAutenticado(true);
      setUser(user);
      startSessionTimer();
    },
    [startSessionTimer]
  );

  const updateUser = useCallback((updateUser: User) => {
    setUser(updateUser);
    localStorage.setItem("user", JSON.stringify(updateUser));
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      // Verifica se a página está sendo descarregada por fechar a aba
      setIsTabClosed(true);
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  useEffect(() => {
    if (isTabClosed) {
      logout();
    }
  }, [isTabClosed, logout]);

  return (
    <AuthContext.Provider
      value={{ autenticado, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
