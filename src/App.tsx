import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./page/home/home";
import User from "./page/splintUser/splintUser";
import BarberShops from "./page/barbershops/barberShopDetailsPage";
import CustomerRegistration from "./page/registrationPage/registrationUserPage";
import RegistrationBarbershop from "./page/registrationPage/registrationBarbershop";
import Bookings from "./page/bookings/bookins";
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
        <Route path="/customerRegistration" element={<CustomerRegistration />} />
        <Route
          path="/registrationBarbershop"
          element={<RegistrationBarbershop />}
        />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;
