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
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../config/ConfigAxios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
  service: Service;
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
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Busca a barbearia correspondente ao serviço
  const barbearia = booking.service?.barbearia;
  console.log("barbeariabooking", booking);

  const removeAgendamento = async (id: string) => {
    if (!isBookingConfirmed) return;
    setIsDeleteLoading(true);
    try {
      await api.delete(`/agendamento/${id}`);
      onRemoveBooking(id);
      toast.success("Reserva cancelada com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro ao deletar o agendamento:", error);
    } finally {
      setIsDeleteLoading(false);
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
                {booking.service?.nome}
                <span className="p-12">R$: {booking.service?.preco}</span>
              </h2>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={barbearia?.foto}
                    alt={barbearia?.nome.charAt(0) || ""}
                    width={40}
                    className="rounded-full"
                  />
                  <AvatarFallback>{barbearia?.nome.charAt(0)}</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{barbearia?.nome}</h3>
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
            <img src="/BarberShopCard.png" alt={barbearia?.nome} />
            <div className="w-full absolute bottom-4 left-0 px-6">
              <Card>
                <CardContent className="p-3 flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={barbearia?.foto}
                      alt={barbearia?.nome.charAt(0) || ""}
                      width={40}
                      className="rounded-full"
                    />
                    <AvatarFallback>{barbearia?.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{barbearia?.nome}</h2>
                    {barbearia?.endereco ? (
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
                  <h2 className="font-bold">{booking.service?.nome}</h2>
                  <h3 className="font-bold text-sm">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service?.preco))}
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
                  <h4 className="text-sm ">{barbearia?.nome}</h4>
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

            <AlertDialog>
              {!isBookingConfirmed || isDeleteLoading ? (
                <Button
                  disabled
                  className="w-full hover:text-black"
                  variant="destructive"
                >
                  Cancelar Reserva
                </Button>
              ) : (
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full hover:text-black"
                    variant="destructive"
                  >
                    Cancelar Reserva
                  </Button>
                </AlertDialogTrigger>
              )}
              <AlertDialogContent className="w-[90%">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possivel reverter essa ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    className="w-full"
                    onClick={() => removeAgendamento(booking.id)}
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
