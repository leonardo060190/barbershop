import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./page/home/home";
import User from "./page/splintUser/splintUser";
import BarberShops from "./page/barbershops/barberShopDetailsPage";
import RegistrationPage from "./page/registrationPage/registrationPage";
import RegistrationBarbershop from "./page/registrationPage/registrationBarbershop";
import Agendamento from "./components/agendamentos/agendamentos";
import Footer from "./components/layout/footer/footer";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/barberShops" element={<BarberShops />} />
        <Route path="/registrationPage" element={<RegistrationPage />} />
        <Route
          path="/registrationBarbershop"
          element={<RegistrationBarbershop />}
        />
        <Route path="/agendamento" element={<Agendamento />} />
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;
