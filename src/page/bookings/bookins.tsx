import { useAuth } from "@/components/authProvider/AuthProvider";
import BookingItem from "./components/bookingItem/bookingItem";
import Header from "../../components/header/header";
import { isFuture } from "date-fns";
import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";

interface Service {
  id: string;
  nome: string;
  preco: string;
  barbearia: Barbearia;
}

interface Profissional {
  id: string;
  nome: string;
  sobreNome: string;
  // Adicione outras propriedades relevantes do profissional, se necessário
}

interface Endereco {
  id: string;
  bairro: string;
  rua: string;
  numero: string;
}

interface Barbearia {
  id: string;
  nome: string;
  foto: string;
  endereco: Endereco;
}

interface ProfissionalServico {
  id: string;
  profissional: Profissional;
  servico: Service;
}

interface Booking {
  id: string;
  data: string;
  hora: string;
  servico: string;
  service: Service;
  profissionalServico: ProfissionalServico;
  barbearia: Barbearia;
  endereco: Endereco;
  status: "Confirmado" | "Finalizado";
}

interface bookingsWithServices extends Booking {
  status: "Confirmado" | "Finalizado";
  service: Service;
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

        const response = await api.get<Booking[]>(
          `/agendamento/cliente/${userId}`
        );
        const bookingsData = response.data;
        console.log("oi", response.data);

        // Função auxiliar para buscar detalhes do profissional e serviço
        const fetchProfissionalServicoDetails = async (
          profissionalServicoId: string
        ) => {
          const response = await api.get<ProfissionalServico>(
            `/profissionalServico/${profissionalServicoId}`
          );
          return response.data;
        };

        const bookingsWithServices = await Promise.all(
          bookingsData.map(async (booking) => {
            const serviceDetails = await fetchProfissionalServicoDetails(
              booking.profissionalServico.id
            );
            if (serviceDetails) {
              booking.profissionalServico = serviceDetails;
            }
            const bookingDate = new Date(`${booking.data}T${booking.hora}`);
            const status: "Confirmado" | "Finalizado" = isFuture(bookingDate)
              ? "Confirmado"
              : "Finalizado";
            return {
              ...booking,
              status,
              profissionalServico: serviceDetails,
            };
          })
        );

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
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    ); // ou qualquer indicador de carregamento
  }

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmado"
  );
  const finishedBookings = bookings.filter(
    (booking) => booking.status === "Finalizado"
  );

  const removeItensAgendados = (id: string) => {
    setBookings((prevBookings) =>
      prevBookings ? prevBookings.filter((booking) => booking.id !== id) : []
    );
  };

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
              <BookingItem
                key={booking.id}
                booking={booking}
                onRemoveBooking={removeItensAgendados}
              />
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
              <BookingItem
                key={booking.id}
                booking={booking}
                onRemoveBooking={removeItensAgendados}
              />
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
