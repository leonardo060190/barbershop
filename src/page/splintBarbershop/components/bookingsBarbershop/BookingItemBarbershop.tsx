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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/authProvider/AuthProvider";

interface Servico {
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
  numero: string;
  rua: string;
}

interface Barbearia {
  id: string;
  nome: string;
  foto: string;
  endereco: Endereco;
}

interface Cliente {
  id: string;
  nome: string;
  foto: string;
  sobreNome: string;
}

interface Telefone {
  id: string;
  numero: string;
}

interface ProfissionalServico {
  id: string;
  profissional: Profissional;
  servico: Servico;
}

interface BookingBarbershop {
  id: string;
  data: string;
  hora: string;
  servico: Servico;
  cliente: Cliente;
  barbearia: Barbearia;
  profissionalServico: ProfissionalServico;
  endereco?: Endereco;
  status: "Confirmado" | "Finalizado";
}

interface BookingItemBarbershopProps {
  bookingBarbershop: BookingBarbershop;
  onRemoveBooking: (id: string) => void;
}

const BookingItemBarbershop: React.FC<BookingItemBarbershopProps> = ({
  bookingBarbershop,
  onRemoveBooking,
}) => {
  console.log("servicoProfissonal", bookingBarbershop);

  const { user } = useAuth();
  const barbeariaId = user?.barbearia?.id || null;

  const bookingDate = new Date(
    `${bookingBarbershop.data}T${bookingBarbershop.hora}`
  );
  const isBookingConfirmed = bookingBarbershop.status === "Confirmado";
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [telefones, setTelefones] = useState<Telefone[]>([]);
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
  const { servico, profissional } = bookingBarbershop.profissionalServico;
  console.log("profissionalServico", servico, profissional);

  useEffect(() => {
    const fetchTelefones = async () => {
      try {
        const response = await api.get(
          `/telefone/cliente/${bookingBarbershop.cliente.id}`
        );
        setTelefones(response.data);
        console.log("telefonecliente", bookingBarbershop.cliente.id);
      } catch (error) {
        console.error("Erro ao buscar os telefones:", error);
      }
    };

    const fetchBarbearia = async () => {
      try {
        const response = await api.get(`/barbearia/${barbeariaId}`);
        setBarbearia(response.data);
        console.log("fetchBarbearia", response.data);
      } catch (error) {
        console.error("Erro ao buscar os telefones:", error);
      }
    };

    fetchTelefones();
    fetchBarbearia();
  }, [bookingBarbershop.cliente.id, barbeariaId]);

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
              <div className="flex gap-2">
                <h1 className=" font-bold capitalize" style={{ color: "#555" }}>
                  Profissional:
                </h1>
                <h2 className="font-semibold capitalize">
                  {profissional.nome} {profissional.sobreNome}
                </h2>
              </div>

              <div className="flex gap-2">
                <h2 className="font-bold capitalize" style={{ color: "#555" }}>
                  Serviço:
                </h2>
                <h2 className="font-semibold capitalize flex gap-5">
                  {servico.nome}
                  <p>
                    <span className="font-bold" style={{ color: "#555" }}>
                      Valor:{" "}
                    </span>
                    R$ {parseFloat(servico.preco).toFixed(2)}{" "}
                  </p>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={bookingBarbershop.cliente.foto}
                    alt={bookingBarbershop.cliente.nome.charAt(0) || ""}
                    width={40}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {bookingBarbershop.cliente.nome.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <h3 className="capitalize">
                  {bookingBarbershop.cliente.nome}{" "}
                  {bookingBarbershop.cliente.sobreNome}
                </h3>
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
                    <h2 className="font-bold capitalize">
                      {barbearia?.nome}
                    </h2>
                    {barbearia?.endereco ? (
                      <div className="text-sm">
                        <h3 className="overflow-hidden whitespace-nowrap text-ellipsis capitalize">{`${barbearia.endereco.rua}, ${barbearia.endereco.numero}`}</h3>
                        <h3 className="overflow-hidden whitespace-nowrap text-ellipsis capitalize">{`${barbearia.endereco.bairro}`}</h3>
                      </div>
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
                  <h2 className="font-semibold capitalize">{servico.nome}</h2>
                  <h3 className="font-semibold text-sm">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(servico.preco))}
                  </h3>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Profissional</h3>
                  <h4 className="text-sm capitalize">
                    {profissional.nome} {profissional.sobreNome}
                  </h4>
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
                  <h3 className="text-gray-400 text-sm">Cliente</h3>
                  <h4 className="text-sm capitalize">
                    {bookingBarbershop.cliente.nome}{" "}
                    {bookingBarbershop.cliente.sobreNome}
                  </h4>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-sm">Telefones</h3>
                  <div className="text-sm">
                    {telefones && telefones.length > 0 ? (
                      telefones.map((telefone) => (
                        <div className="text-sm " key={telefone.id}>
                          {telefone.numero}
                        </div>
                      ))
                    ) : (
                      <p>Nenhum telefone cadastrado</p>
                    )}
                  </div>
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
              <AlertDialogContent className="w-[90%]">
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
                    onClick={() => removeAgendamento(bookingBarbershop.id)}
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

export default BookingItemBarbershop;
