// import React from "react";
// import { AuthProvider } from "./components/authProvider/AuthProvider";
// import RoutesWithAuth from "./components/routesWithAuth/RouterWithAuth";

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <RoutesWithAuth />
//     </AuthProvider>
//   );
// };

// export default App;


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./page/home/home";
import User from "./page/splintUser/splintUser";
import BarberShops from "./page/barbershops/barberShopDetailsPage";
import RegistrationUser from "./page/registrationPage/registrationUserPage";
import RegistrationBarbershop from "./page/registrationPage/RegistrationBarbershop";
import Bookings from "./page/bookings/bookins";
import Splintbarbershop from "./page/splintBarbershop/SplintBarbershop"
import Footer from "./components/layout/footer/footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/barberShops" element={<BarberShops />} />
        <Route path="/registrationUser" element={<RegistrationUser />} />
        <Route path="/registrationBarbershop" element={<RegistrationBarbershop />}/>
        <Route path="/splintbarbershop" element={<Splintbarbershop />}/>  
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;