import { useAuth } from "@/components/authProvider/AuthProvider";
import BookingItem from "../../components/bookingItem/bookingItem";
import Header from "../../components/header/header";
import { isFuture } from "date-fns";
import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";

interface Service {
  id: string;
  nome: string;
  preco: string;
  barbeariaId: string;

}

interface Barbearia {
  id: string;
  nome: string;
  foto: string;
}
interface Booking {
  id: string;
  data: string;
  hora: string;
  servico: Service;
  barbearia: Barbearia;
  status: "Confirmado" | "Finalizado";
}

interface bookingsWithServices extends Booking {
  status: "Confirmado" | "Finalizado";
  servico: Service; 
  barbearia: Barbearia;
}


const Bookings = () => {
  const { user } = useAuth();
  const userId = user?.cliente?.id || null;
  const [bookings, setBookings] = useState<bookingsWithServices[] | null>(null);
 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!userId) return;

        const response = await api.get<Booking[]>(`/agendamento/cliente/${userId}`);
        const bookingsData = response.data;

        const bookingsWithServices = bookingsData.map(booking => {
          const bookingDate = new Date(`${booking.data}T${booking.hora}`);
          const status: "Confirmado" | "Finalizado" = isFuture(bookingDate) ? "Confirmado" : "Finalizado";
          return {
            ...booking,
            status
          };
        });

        setBookings(bookingsWithServices);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  if (!bookings) {
    return <div>Loading...</div>; // ou qualquer indicador de carregamento
  }


  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmado"
  );
  const finishedBookings = bookings.filter(
    (booking) => booking.status === "Finalizado"
  );



  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Cofirmados
        </h2>
        <div className="flex flex-col gap-3">
          {confirmedBookings.length > 0 ? (
            confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))
          ) : (
            <div>Nenhum agendamento confirmado.</div>
          )}
        </div>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Finalizados
        </h2>
        <div className="flex flex-col gap-3">
          {finishedBookings.length > 0 ? (
            finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))
          ) : (
            <div>Nenhum agendamento finalizado.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
