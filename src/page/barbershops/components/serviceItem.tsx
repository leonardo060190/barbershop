import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "./hours";
import { format, setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";

import { api } from "../../../../config/ConfigAxios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/authProvider/AuthProvider";
interface BarbershopServicosProps {
  id: string;
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
  profissionalId: string;
  barbeariaId: string;
  nomeBarbearia: string;
  nomeProfissional: string;
}
interface Booking {
  data: string;
  hora: string;
  profissionalServico: { id: string };
}

const ServiceItem: React.FC<BarbershopServicosProps> = ({
  id,
  foto,
  nome,
  preco,
  descricao,
  barbeariaId,
  profissionalId,
  nomeBarbearia,
  nomeProfissional,
}) => {
  const { user } = useAuth();
  const userId = user?.cliente?.id || null;
  console.log("userId", userId);

  const navigate = useNavigate();

  const [submitIsLoading, SetSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetISOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<string | undefined>();
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.style.cursor = "grabbing";
    scrollContainer.style.userSelect = "none";

    const startX = e.pageX - scrollContainer.offsetLeft;
    const scrollLeft = scrollContainer.scrollLeft;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1; // Ajuste a velocidade do scroll aqui
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      scrollContainer.style.cursor = "grab";
      scrollContainer.style.removeProperty("user-select");

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getDayBookings = useCallback(
    async (
      barbeariaId: string,
      profissionalId: string,
      date: Date
    ): Promise<Booking[]> => {
      try {
        const response = await api.get("/agendamento", {
          params: {
            barbeariaId,
            profissionalId,
            date: date.toISOString().split("T")[0], // Enviar a data no formato yyyy-MM-dd
          },
        });

        return response.data;
      } catch (error) {
        toast.error("Ocorreu um erro ao obter as reservas dop dia.", {
          style: {
            backgroundColor: "#ff0000", // Cor de fundo
            color: "#FFFFFF", // Cor do texto
          },
        });
        return [];
      }
    },
    []
  );

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async (): Promise<void> => {
      try {
        const bookings = await getDayBookings(
          barbeariaId,
          profissionalId,
          date
        );
        setDayBookings(bookings);
      } catch (error) {
        toast.error("Ocorreu um erro ao obter as reservas dop dia.", {
          style: {
            backgroundColor: "#ff0000", // Cor de fundo
            color: "#FFFFFF", // Cor do texto
          },
        });
      }
    };
    refreshAvailableHours();
  }, [date, barbeariaId, profissionalId, getDayBookings]);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingSubmit = async () => {
    SetSubmitIsLoading(true);
    try {
      if (!hour || !date || !userId) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);
      const newDate = setMinutes(setHours(date!, dateHour), dateMinutes);

      const formattedDate = format(newDate, "yyyy-MM-dd");
      console.log(formattedDate);

      await saveBooking({
        profissionalServico: profissionalId,
        data: formattedDate, // "yyyy-MM-dd"
        hora: format(newDate, "HH:mm"), // "HH:mm"
        cliente: userId,
      });

      setSheetISOpen(false);
      setHour(undefined);
      setDate(undefined);
      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'as' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => navigate("/bookings"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      SetSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    return generateDayTimeList(date).filter((time) => {
      const [timeHour, timeMinutes] = time.split(":").map(Number);

      // Verificar se o horário já passou no dia atual
      const isPastTime =
        date.toDateString() === now.toDateString() &&
        (timeHour < currentHour ||
          (timeHour === currentHour && timeMinutes < currentMinutes));

      if (isPastTime) {
        return false;
      }

      const isTimeBooked = dayBookings.some((booking) => {
        const bookingHour = Number(booking.hora?.split(":")[0]);
        const bookingMinutes = Number(booking.hora?.split(":")[1]);

        return (
          bookingHour === timeHour &&
          bookingMinutes === timeMinutes &&
          booking.profissionalServico.id === profissionalId &&
          booking.data === date.toISOString().split("T")[0]
        );
      });

      return !isTimeBooked;
    });
  }, [date, dayBookings, profissionalId]);

  console.log(timeList);

  // Função para salvar a reserva
  async function saveBooking(bookingData: {
    profissionalServico: string;
    data: string; // Formato yyyy-MM-dd
    hora: string; // Formato HH:mm
    cliente: string;
  }) {
    try {
      const response = await api.post("/agendamento", {
        ...bookingData,
        cliente: { id: bookingData.cliente },
        profissionalServico: { id: bookingData.profissionalServico },
      });
      return response.data;
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar a reserva.", {
        style: {
          backgroundColor: "#ff0000", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
      throw error;
    } finally {
      SetSubmitIsLoading(false);
    }
  }

  return (
    <div key={id}>
      <Card className="w-full">
        <CardContent className="p-3">
          <div className="flex gap-6 items-center">
            <div className="relative ">
              <img
                src={foto}
                alt={nome}
                sizes="100vw"
                className=" Fullscreen rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
              />
            </div>

            <div className="flex flex-col w-full">
              <div className="break-all">
                <h1 className="font-bold text-sm">{nome}</h1>
                <p className="text-sm text-gray-400">{descricao}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-l text-sm font-bold text-primary">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(preco)}
                </p>

                <Sheet open={sheetIsOpen} onOpenChange={setSheetISOpen}>
                  <SheetTrigger asChild>
                    <Button variant="secondary" className="text-primary">
                      Reservar
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="p-0">
                    <SheetHeader className="text-left px-5 py-2 border-b border-solid border-secondary">
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>
                    <div className="px-3">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateClick}
                        locale={ptBR}
                        fromDate={new Date()}
                        styles={{
                          head_cell: {
                            width: "100%",
                            textTransform: "capitalize",
                          },
                          cell: {
                            width: "100%",
                          },
                          button: {
                            width: "100%",
                          },
                          nav_button_previous: {
                            width: "24",
                            height: "24",
                          },
                          nav_button_next: {
                            width: "24",
                            height: "24",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </div>
                    {/* Mostra lista de horários apenas se alguma data estaver selecionada */}
                    {date && (
                      <>
                        {timeList.length === 0 ? (
                          <div className="py-3 px-5 text-center text-gray-500 border-y border-solid border-secondary ">
                            Todos os horários já estão reservados para esta
                            data.
                          </div>
                        ) : (
                          <div
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            className="flex gap-3 overflow-x-auto py-3 px-5 border-y border-solid border-secondary cursor-grab [&::-webkit-scrollbar]:hidden"
                          >
                            {timeList.map((time) => (
                              <Button
                                onClick={() => handleHourClick(time)}
                                variant={hour === time ? "default" : "outline"}
                                className="rounded-full"
                                key={time}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    <div className="py-3 px-5 border-solid border-secondary">
                      <Card>
                        <CardContent className="px-0 py-0">
                          <div className="px-6 py-2 flex flex-col gap-3">
                            <div className="flex justify-between ">
                              <h2 className="font-bold">{nome}</h2>
                              <h3 className="font-bold text-sm">
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(preco)}
                              </h3>
                            </div>
                            {date && (
                              <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Data</h3>
                                <h4 className="text-sm ">
                                  {format(date, "dd 'de' MMMM", {
                                    locale: ptBR,
                                  })}
                                </h4>
                              </div>
                            )}
                            {hour && (
                              <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">
                                  Horário
                                </h3>
                                <h4 className="text-sm ">{hour}</h4>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <h3 className="text-gray-400 text-sm">
                                Profissional
                              </h3>
                              <h4 className="text-sm ">{nomeProfissional}</h4>
                            </div>
                            <div className="flex justify-between">
                              <h3 className="text-gray-400 text-sm">
                                Barbearia
                              </h3>
                              <h4 className="text-sm ">{nomeBarbearia}</h4>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <SheetFooter className="px-5 justify-center ">
                      <Button
                        onClick={handleBookingSubmit}
                        className="w-full"
                        disabled={!hour || !date || submitIsLoading}
                      >
                        {submitIsLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirmar Reserva
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
