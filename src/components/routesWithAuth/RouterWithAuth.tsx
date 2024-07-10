import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import "../../index.css";

import Home from "../../page/home/home";
import BarberShops from "../../page/barbershops/barberShopDetailsPage";
import RegistrationUser from "../../page/registrationPage/registrationUserPage";
import RegistrationBarbershop from "../../page/registrationPage/registrationBarbershop";
import Bookings from "../../page/bookings/bookins";
import Splintbarbershop from "../../page/splintBarbershop/SplintBarbershop";
import AllBarbershopsDetails from "../../page/allBarbershops/AllBarbershopsDetails";
import SearchResults from "../../page/search/SearchResults";
import BookingBarbershop from "../../page/splintBarbershop/components/bookingsBarbershop/BookingsBarbershop";
import Footer from "../layout/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "../protectedRoute/ProtectedRouter";

const RoutesWithAuth: React.FC = () => {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/registrationUser" element={<RegistrationUser />} />
        <Route
          path="/registrationBarbershop"
          element={<RegistrationBarbershop />}
        />

        <Route
          path="/barberShops/:id"
          element={
            <ProtectedRoute>
              <BarberShops />
            </ProtectedRoute>
          }
        />

        <Route
          path="/splintbarbershop/:id"
          element={
            <ProtectedRoute>
              <Splintbarbershop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allbarbershopsdetails"
          element={
            <ProtectedRoute>
              <AllBarbershopsDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-results/:nome"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookingsBarbershop"
          element={
            <ProtectedRoute>
              <BookingBarbershop />
            </ProtectedRoute>
          }
        />

     
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
};

export default RoutesWithAuth;
