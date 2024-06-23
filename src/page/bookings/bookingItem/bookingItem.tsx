import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { api } from "../../../../config/ConfigAxios";
import { X } from "lucide-react";

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
  rua: string;
}

interface Booking {
  id: string;
  data: string;
  hora: string;
  servico: Service;
  barbearia: Barbearia;
  endereco?: Endereco;
  status: "Confirmado" | "Finalizado";
}

interface BookingItemProps {
  booking: Booking;
  onRemoveBooking: (id: string) => void;
}

const BookingItem: React.FC<BookingItemProps> = ({
  booking,
  onRemoveBooking,
}) => {
  const bookingDate = new Date(`${booking.data}T${booking.hora}`);
  const isBookingConfirmed = booking.status === "Confirmado";

  // Busca a barbearia correspondente ao serviço
  const barbearia = booking.servico.barbearia;

  const removeAgendamento = async (id: string) => {
    if (
      !window.confirm(
        `Confirma a exclusão do serviço ${booking.servico.nome} ?`
      )
    ) {
      return;
    }
    try {
      await api.delete(`/agendamento/${id}`);
      onRemoveBooking(id);
    } catch (error) {
      console.error("Erro ao deletar o serviço:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
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
                {booking.servico.nome}{" "}
                <span className="p-12">R$: {booking.servico.preco}</span>
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
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="text-left px-6 pb-4 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <div className="relative h-[180] w-11/12 mt-4">
            <img src="/BarberShopCard.png" alt={barbearia.nome} />
            <div className="w-full absolute bottom-4 left-0 px-6">
              <Card>
                <CardContent className="p-3 flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={barbearia.foto} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{barbearia.nome}</h2>
                    {barbearia.endereco ? (
                      <h3 className="Text-xs overflow-hidden text-nowrap text-ellipsis">{`${barbearia.endereco.rua}, ${barbearia.endereco.bairro}`}</h3>
                    ) : (
                      <h3>Endereço não disponível</h3>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className=" justify-center my-3"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className=" w-11/12">
            <CardContent className="px-0 py-0 ">
              <div className="px-6 py-5 flex flex-col gap-3">
                <div className="flex justify-between ">
                  <h2 className="font-bold">{booking.servico.nome}</h2>
                  <h3 className="font-bold text-sm">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.servico.preco))}
                  </h3>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Data</h3>
                  <h4 className="text-sm ">
                    {format(bookingDate, "dd 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </h4>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Horário</h3>
                  <h4 className="text-sm ">{format(bookingDate, "HH:mm")}</h4>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Barbearia</h3>
                  <h4 className="text-sm ">{barbearia.nome}</h4>
                </div>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-row gap-3 mt-6  w-11/12 ">
            <SheetClose asChild>
              <Button className="w-full hover:text-primary" variant="secondary">
                Voltar
              </Button>
            </SheetClose>
            <Button
              disabled={!isBookingConfirmed}
              className="w-full hover:text-black"
              variant="destructive"
              onClick={() => removeAgendamento(booking.id)}
            >
              <X size={18} />
              Cancelar Reserva
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
