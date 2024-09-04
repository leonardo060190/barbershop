import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useAuth } from "@/components/authProvider/AuthProvider";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import { format, isFuture } from "date-fns";
import Header from "@/components/header/header";
import { ptBR } from "date-fns/locale";

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
  profissionalServico: ProfissionalServico;
  barbearia: Barbearia;
  cliente: Cliente;
  endereco?: Endereco;
  status: "Confirmado" | "Finalizado";
}

interface bookingsBarbershopServices extends BookingBarbershop {
  status: "Confirmado" | "Finalizado";
  servico: Servico;
  barbearia: Barbearia;
}

const chartConfig = {
  lucro: {
    label: "Lucro",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const GraficosBarbearia = () => {
  const { user } = useAuth();
  const barbeariaId = user?.barbearia?.id || null;
  const [bookingsBarbershop, setBookingsBarbershop] = useState<
    bookingsBarbershopServices[] | null
  >(null);

  const [lucroMes, setLucroMes] = useState<{ month: string; lucro: number }[]>(
    []
  );

  useEffect(() => {
    const fetchBookingsBarbershop = async () => {
      try {
        if (!barbeariaId) return;

        console.log(`Fetching bookings for barbershop ID: ${barbeariaId}`);

        const response = await api.get<BookingBarbershop[]>(
          `/agendamento/profissionalservico/barbearia/${barbeariaId}`
        );

        const bookingsBarbershopData = response.data;
        console.log("Response data:", response.data);

        // Função auxiliar para buscar detalhes do profissional e serviço
        const fetchProfissionalServicoDetails = async (
          profissionalServicoId: string
        ) => {
          const response = await api.get<ProfissionalServico>(
            `/profissionalServico/${profissionalServicoId}`
          );
          return response.data;
        };

        // Obter detalhes adicionais para cada agendamento
        const bookingsWithDetails = await Promise.all(
          bookingsBarbershopData.map(async (booking) => {
            const profissionalServicoDetails =
              await fetchProfissionalServicoDetails(
                booking.profissionalServico.id
              );

            const bookingDate = new Date(`${booking.data}T${booking.hora}`);
            const status: "Confirmado" | "Finalizado" = isFuture(bookingDate)
              ? "Confirmado"
              : "Finalizado";

            return {
              ...booking,
              status,
              profissionalServico: profissionalServicoDetails,
            };
          })
        );

        //Filtra agendamentos finalizados
        const FinalizedBookings = bookingsWithDetails.filter(
          (booking) => booking.status === "Finalizado"
        );

        setBookingsBarbershop(FinalizedBookings);

        console.log("bookingsWithDetails", FinalizedBookings);

        // Calcula ganhos mensais após os dados serem carregados
        const lucroDoMes = FinalizedBookings.reduce(
          (acc, booking) => {
            const month = format(new Date(booking.data), "MMMM", {
              locale: ptBR,
            });

            // Garantir que o preço é extraído corretamente do profissionalServico

            const preco: number = booking.profissionalServico.servico
              ? parseFloat(booking.profissionalServico.servico.preco)
              : 0;

            console.log(`Mês: ${month}, Preço: ${preco}`);
            acc[month] = acc[month] ? acc[month] + preco : preco;
            return acc;
          },
          {} as Record<string, number>
        );

        // Cria uma lista de todos os meses do ano com valor inicial 0
        // const todosMeses = [
        //   "Janeiro",
        //   "Fevereiro",
        //   "Março",
        //   "Abril",
        //   "Maio",
        //   "Junho",
        //   "Julho",
        //   "Agosto",
        //   "Setembro",
        //   "Outubro",
        //   "Novembro",
        //   "Dezembro",
        // ];

        // Inicializa lucroMes com todos os meses e valor 0
        const lucroMesInicial = Object.keys(lucroDoMes).map((month) => ({
          month,
          lucro: lucroDoMes[month] || 0,
        }));
        // Atualiza a lista de lucroMes para garantir que os valores corretos sejam exibidos
        setLucroMes(lucroMesInicial);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (barbeariaId) {
      fetchBookingsBarbershop();
    }
  }, [barbeariaId]);

  if (!bookingsBarbershop) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Lucro Mensal</CardTitle>
          <CardDescription>Janeiro - Desembro 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={lucroMes}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="capitalize"
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                labelClassName="capitalize"
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="lucro" fill="var(--color-lucro)" radius={5}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Lucro por mês durante o ano
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default GraficosBarbearia;
