import { useAuth } from "@/components/authProvider/AuthProvider";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import { format, isFuture } from "date-fns";
import Header from "@/components/header/header";
import { ptBR } from "date-fns/locale";
import GraficoLucroPorMes from "./components/GraficoLucroPorMes";
import GraficoLucroPorProfissional from "./components/GraficoLucroPorProfissional";
import GraficoDeServicoAgendadoMes from "./components/GraficoDeServicoAgendadoMes";
import { GerarRelatorioPDF } from "../gerarRelatorioPDF/GerarRelatorioPDF";

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

interface RelatorioCompleto {
  month: string;
  lucro: number;
  servicoNome: string;
  barbeariaNome: string;
}

interface bookingsBarbershopServices extends BookingBarbershop {
  status: "Confirmado" | "Finalizado";
  servico: Servico;
  barbearia: Barbearia;
}

const GraficosBarbeariaPage = () => {
  const { user } = useAuth();
  const barbeariaId = user?.barbearia?.id || null;

  const [bookingsBarbershop, setBookingsBarbershop] = useState<
    bookingsBarbershopServices[] | null
  >(null);

  const [lucroMes, setLucroMes] = useState<{ month: string; lucro: number }[]>(
    []
  );

  const [lucroMesProfissional, setLucroMesProfissional] = useState<
    { profissionalNome: string; month: string; lucro: number }[]
  >([]);

  const [agendamentosPorServico, setAgendamentosPorServico] = useState<
    { servicoNome: string; totalAgendamentos: number; month: string }[]
  >([]);

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
        const todosMeses = [
          "janeiro",
          "fevereiro",
          "março",
          "abril",
          "maio",
          "junho",
          "julho",
          "agosto",
          "setembro",
          "outubro",
          "novembro",
          "dezembro",
        ];

        // Inicializa lucroMes com todos os meses e valor 0
        const lucroMesInicial = todosMeses.map((month) => ({
          month,
          lucro: lucroDoMes[month] || 0,
        }));

        // Debug: Verificar os valores de lucroMesInicial
        console.log("lucroMesInicial:", lucroMesInicial);
        // Atualiza a lista de lucroMes para garantir que os valores corretos sejam exibidos
        setLucroMes(lucroMesInicial);

        // Calcula lucro por profissiola por mês
        const lucroPorProfissional = FinalizedBookings.reduce(
          (acc, booking) => {
            const month = format(new Date(booking.data), "MMMM", {
              locale: ptBR,
            });
            const profissionalNome =
              booking.profissionalServico.profissional.nome;

            const preco: number = booking.profissionalServico.servico
              ? parseFloat(booking.profissionalServico.servico.preco)
              : 0;

            if (!acc[profissionalNome]) {
              acc[profissionalNome] = {};
            }

            acc[profissionalNome][month] = acc[profissionalNome][month]
              ? acc[profissionalNome][month] + preco
              : preco;

            return acc;
          },

          {} as Record<string, Record<string, number>>
        );

        const lucroDoMesProfissional = Object.entries(
          lucroPorProfissional
        ).flatMap(([profissionalNome, meses]) =>
          todosMeses.map((month) => ({
            profissionalNome,
            month,
            lucro: meses[month] || 0,
          }))
        );
        // Debug: Verificar os valores calculados
        console.log("Lucro por profissional por mês:", lucroPorProfissional);
        setLucroMesProfissional(lucroDoMesProfissional);

        const agendamentosPorServico = FinalizedBookings.reduce(
          (acc, booking) => {
            const month = format(new Date(booking.data), "MMMM", {
              locale: ptBR,
            });
            const servicoNome = booking.profissionalServico.servico.nome;
            // Se ainda não existe um array para este serviço, inicializa um
            if (!acc[servicoNome]) {
              acc[servicoNome] = {};
            }

            // Incrementa o contador de agendamentos para o mês atual
            acc[servicoNome][month] = (acc[servicoNome][month] || 0) + 1;

            return acc;
          },
          {} as Record<string, Record<string, number>>
        );

        // Formatando os dados para o gráfico
        const dadosGrafico = Object.entries(agendamentosPorServico).flatMap(
          ([servicoNome, meses]) =>
            todosMeses.map((month) => ({
              servicoNome,
              totalAgendamentos: meses[month] || 0,
              month // Inclui o mês aqui
            }))
        );
        

        console.log("agendamentosPorServico:", agendamentosPorServico);
        setAgendamentosPorServico(dadosGrafico);
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

  const relatorioCompleto: RelatorioCompleto[] = lucroMes.map(mes => ({
    month: mes.month,
    lucro: mes.lucro,
    servicoNome: "Nome do Serviço", // Substitua por uma lógica para obter o nome do serviço correspondente
    barbeariaNome: user?.barbearia?.nome || "Nome da Barbearia", // Utilize o nome da barbearia
  }));


  return (
    <>
      <Header />
      <h1 className="font-semibold px-12 py-6 text-4xl">Graficos Gerais</h1>
      <div className=" px-5 py-5 flex flex-col md:flex-row">
        <div className="w-full grid grid-cols-1  xl:grid-cols-2 gap-3">
          <GraficoLucroPorMes lucroMes={lucroMes} />

          <GraficoLucroPorProfissional
            lucroMesProfissional={lucroMesProfissional}
          />
        </div>
      </div>

      <div className=" px-5 py-5 flex flex-col md:flex-row">
        <div className="w-full grid grid-cols-1  xl:grid-cols-2 gap-3">
          <GraficoDeServicoAgendadoMes
            agendamentosPorServico={agendamentosPorServico}
          />
        </div>
      </div>

      <div className="px-5 py-5">
      <button
        onClick={() => GerarRelatorioPDF(relatorioCompleto)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Gerar PDF do Lucro por Mês
      </button>
    </div>
    </>
  );
};

export default GraficosBarbeariaPage;
