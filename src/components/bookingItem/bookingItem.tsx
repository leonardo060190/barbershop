import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

interface BookingItemProps {
  booking: Booking;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
  const bookingDate = new Date(`${booking.data}T${booking.hora}`);
  const isBookingConfirmed = booking.status === "Confirmado";

  // Busca a barbearia correspondente ao serviço
  const barbearia = booking.servico.barbearia;

  return (
    <Card className="debug-border">
      <CardContent className="p-0 flex py-0 debug-border">
        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5 debug-border">
          <div className=" flex items-center">
            <Badge
              variant={isBookingConfirmed ? "default" : "secondary"}
              className=" justify-center"
            >
              {isBookingConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
          </div>

          <h2 className="font-bold">
            {booking.servico.nome} R$: {booking.servico.preco}
          </h2>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={barbearia.foto}
                alt={barbearia.nome.charAt(0) || ""}
                width={40}
                className="rounded-full"
              />
              <AvatarFallback>{barbearia.nome.charAt(0)}</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{barbearia.nome}</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l flex-1 border-solid border-secondary debug-border">
          <p className="text-sm">
            {format(bookingDate, "MMMM", { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(bookingDate, "dd")}</p>
          <p className="text-sm">{format(bookingDate, "HH:mm")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
