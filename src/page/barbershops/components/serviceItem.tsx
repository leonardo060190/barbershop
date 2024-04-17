import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "./hours";
import { format } from "date-fns";

const ServiceItem = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<string | undefined>();

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  console.log(timeList);

  return (
    <div>
      <Card>
        <CardContent className="p-3">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <img
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="barber"
                height={0}
                width={0}
                sizes="100vw"
                className="min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] rounded-2xl"
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

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary" className="text-primary">
                      Reservar
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="p-0">
                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 px-5">
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
                    <div className="py-6 px-5 border-t border-solid border-seconndary">
                      <Card>
                        <CardContent>
                          <div className="flex justify-between">
                            <h2 className="font-bold">Nome Serviço</h2>
                            <h3 className="font-bold text-sm">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(55.4))}
                            </h3>
                          </div>
                          {date && (
                            <div className="flex justifu-between">
                              <h3 className="text-gray-400 text-sm">Data</h3>
                              <h4 className="text-sm ">
                                {format(date, "dd 'de' MMMM", { locale: ptBR })}
                              </h4>
                            </div>
                          )}
                          {hour && (
                            <div className="flex justifu-between">
                              <h3 className="text-gray-400 text-sm">Horário</h3>
                              <h4 className="text-sm ">{hour}</h4>
                            </div>
                          )}
                          
                            <div className="flex justifu-between">
                              <h3 className="text-gray-400 text-sm">Barbearia</h3>
                              <h4 className="text-sm ">{"Nome barbearia"}</h4>
                            </div>
                          
                        </CardContent>
                      </Card>
                    </div>
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
