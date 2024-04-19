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
import { useEffect, useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "./hours";
import { format, setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";

import { saveBooking } from "./saveBooking";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getDayBookings } from "./getBookings";

const ServiceItem = () => {
  // const {data} = useSession()
  const navigate = useNavigate();

  const [submitIsLoading, SetSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetISOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<string | undefined>();
  const [dayBookings, setDayBookings] = useState([]);

  useEffect(() => {
    if (!date) {
      return;
    }
    const refreshAvailableHours = async () => {
      const dayBookings = await getDayBookings(date);
    };
  }, [date]);

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
      if (!hour || !date || !data?.user) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[0]);
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershopItemPopulares.id,
        date: newDate,
        userId: (data.user as any).id,
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
          onClick: () => navigate("/agendamento"),
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
    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }
      return false;
    });
  }, [date, dayBookings]);

  console.log(timeList);

  return (
    <div >
      <Card className="w-full">
        <CardContent className="p-3">
          <div className="flex gap-6 items-center">
            <div className="relative ">
              <img
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="barber"
                height={0}
                width={0}
                sizes="100vw"
                className=" rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
              />
            </div>

            <div className="flex flex-col w-full">
              <h1 className="font-bold text-sm">Service nome</h1>
              <p className="text-sm text-gray-400">Descrição...</p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-l text-sm font-bold text-primary">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(55.4))}
                </p>

                <Sheet open={sheetIsOpen} onOpenChange={setSheetISOpen}>
                  <SheetTrigger asChild>
                    <Button variant="secondary" className="text-primary">
                      Reservar
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="p-0">
                    <SheetHeader className="text-left px-5 py-4 border-b border-solid border-secondary">
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>
                    <div className="py-3 px-5">
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
                            width: "32",
                            height: "32",
                          },
                          nav_button_next: {
                            width: "32",
                            height: "32",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </div>
                    {/* Mostarlista de hor´rios apenas se alguma data estaver selecionada */}
                    {date && (
                      <div className="flex gap-3 overflow-x-auto py-6 px-5 border-y border-solid border-secondary [&::-webkit-scrollbar]:hidden">
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
                    <div className="py-5 px-5 border-solid border-seconndary">
                      <Card>
                        <CardContent className="px-0 py-0">
                          <div className="px-6 py-5 flex flex-col gap-3">
                            <div className="flex justify-between ">
                              <h2 className="font-bold">Nome Serviço</h2>
                              <h3 className="font-bold text-sm">
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(Number(55.4))}
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
                                Barbearia
                              </h3>
                              <h4 className="text-sm ">{"Nome barbearia"}</h4>
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
