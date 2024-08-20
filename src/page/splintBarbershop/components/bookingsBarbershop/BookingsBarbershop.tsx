import { useAuth } from "@/components/authProvider/AuthProvider";
import Header from "../../../../components/header/header";
import { isFuture } from "date-fns";
import { useEffect, useState } from "react";
import BookingItemBarbershop from "./BookingItemBarbershop";
import { api } from "../../../../../config/ConfigAxios";

interface Service {
  id: string;
  nome: string;
  preco: string;
  barbearia: Barbearia;
}

interface Barbearia {
  id: string;
  nome: string;
  foto: string;
  endereco: Endereco;
}

interface Endereco {
  id: string;
  bairro: string;
  numero: string;
  rua: string;
}

interface Telefone {
  id: string;
  numero: string;
  cliente: Cliente;

}

interface Cliente {
  id: string;
  nome: string;
  foto: string;
  sobreNome: string;
  telefones?: Telefone[];


}

interface BookingBarbershop {
  id: string;
  data: string;
  hora: string;
  servico: Service;
  barbearia: Barbearia;
  cliente: Cliente;
  endereco?: Endereco;
  status: "Confirmado" | "Finalizado";
}

interface bookingsBarbershopServices extends BookingBarbershop {
  status: "Confirmado" | "Finalizado";
  servico: Service;
  barbearia: Barbearia;
}
const BookingsBarbershop = () => {
  const { user } = useAuth();
  const barbeariaId = user?.barbearia?.id || null;
  const [bookingsBarbershop, setBookingsBarbershop] = useState<
    bookingsBarbershopServices[] | null
  >(null);

  useEffect(() => {
    const fetchBookingsBarbershop = async () => {
      try {
        if (!barbeariaId) return;

        console.log(`Fetching bookings for barbershop ID: ${barbeariaId}`);

        const response = await api.get<BookingBarbershop[]>(
          `/agendamento/servico/barbearia/${barbeariaId}`
        );

        const bookingsBarbershopData = response.data;
        console.log("Response data:", response.data);
        const BookingsBarbershopServices = bookingsBarbershopData.map(
          (bookingBarbershop) => {
            const bookingDate = new Date(
              `${bookingBarbershop.data}T${bookingBarbershop.hora}`
            );
            const status: "Confirmado" | "Finalizado" = isFuture(bookingDate)
              ? "Confirmado"
              : "Finalizado";
            return {
              ...bookingBarbershop,
              status,
            };
          }
        );
        setBookingsBarbershop(BookingsBarbershopServices);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (barbeariaId) {
      fetchBookingsBarbershop();
    }
  }, [barbeariaId]);

  if (!bookingsBarbershop) {
    return <div>Loading...</div>; // ou qualquer indicador de carregamento
  }

  const confirmedBookings = bookingsBarbershop.filter(
    (bookingBarbershop) => bookingBarbershop.status === "Confirmado"
  );
  const finishedBookings = bookingsBarbershop.filter(
    (bookingBarbershop) => bookingBarbershop.status === "Finalizado"
  );

  const removeItensAgendados = (id: string) => {
    setBookingsBarbershop((prevBookings) =>
      prevBookings
        ? prevBookings.filter(
            (bookingBarbershop) => bookingBarbershop.id !== id
          )
        : []
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
            confirmedBookings.map((bookingBarbershop) => (
              <BookingItemBarbershop
                key={bookingBarbershop.id}
                bookingBarbershop={bookingBarbershop}
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
            finishedBookings.map((bookingBarbershop) => (
              <BookingItemBarbershop
                key={bookingBarbershop.id}
                bookingBarbershop={bookingBarbershop}
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

export default BookingsBarbershop;
