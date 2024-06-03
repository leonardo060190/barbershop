import React from "react";
import { AuthProvider } from "./components/authProvider/AuthProvider";
import RoutesWithAuth from "./components/routesWithAuth/RouterWithAuth";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RoutesWithAuth />
    </AuthProvider>
  );
};

export default App;

