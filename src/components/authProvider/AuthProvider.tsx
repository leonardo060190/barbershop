// import React, { useState, createContext, useContext, ReactNode } from 'react';

// interface AuthContextType {
//   autenticado: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [autenticado, setAutenticado] = useState<boolean>(false);

//   const login = () => {
//     setAutenticado(true);
//   };

//   const logout = () => {
//     setAutenticado(false);
//   };

//   return (
//     <AuthContext.Provider value={{ autenticado, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
