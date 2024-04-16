import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./page/home/home";
import User from "./page/splintUser/splintUser";
import BarberShops from "./page/barbershops/barberShopDetailsPage";
import RegistrationPage from "./page/registrationPage/registrationPage";
import RegistrationBarbershop from "./page/registrationPage/registrationBarbershop";
import Agendamento from "./components/agendamentos/agendamento";
import Footer from "./components/layout/footer/footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/User" element={<User />} />
        <Route path="/BarberShops" element={<BarberShops />} />
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
        <Route
          path="/RegistrationBarbershop"
          element={<RegistrationBarbershop />}
        />
        <Route path="/Agendamento" element={<Agendamento />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
