import Header from "@/components/header/header";
import { isFuture } from "date-fns";
import { useEffect, useState } from "react";
import { api } from "../../../../../../config/ConfigAxios";
import { useParams } from "react-router-dom";
import MeusAgendamentosItem from "./MeusAgendamentosItem";

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

interface MeusAgendamentos {
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

interface meusAgendamentosServices extends MeusAgendamentos {
  status: "Confirmado" | "Finalizado";
  servico: Servico;
  barbearia: Barbearia;
}

const MeusAgendamentos = () => {
    const { id } = useParams<{ id: string }>();

    const [MeusAgendamentos, setMeusAgendamentos] = useState<
    meusAgendamentosServices[] | null
    >(null);
  
    useEffect(() => {
      const fetchMeusAgendamentos = async () => {
        try {
          if (!id) return;
  
          console.log(`Fetching bookings for barbershop ID: ${id}`);
  
          const response = await api.get<MeusAgendamentos[]>(
            `/agendamento/profissionalservico/profissional/${id}`
          );
  
          const meusAgendamentosData = response.data;
          console.log("Response data:", response.data);
  
     // Função auxiliar para buscar detalhes do profissional e serviço
     const fetchProfissionalServicoDetails = async (profissionalServicoId: string) => {
      const response = await api.get<ProfissionalServico>(`/profissionalServico/${profissionalServicoId}`);
      return response.data;
    };
  
  
            // Obter detalhes adicionais para cada agendamento
          const meusAgendamentosDetails = await Promise.all(meusAgendamentosData.map(async (agendamento) => {
            const profissionalServicoDetails = await fetchProfissionalServicoDetails(agendamento.profissionalServico.id);
  
              const agendamentoDate = new Date(
                `${agendamento.data}T${agendamento.hora}`
              );
              const status: "Confirmado" | "Finalizado" = isFuture(agendamentoDate)
                ? "Confirmado"
                : "Finalizado";
                return {
                  ...agendamento,
                  status,
                  profissionalServico: profissionalServicoDetails,
                };
            }
          ));
          setMeusAgendamentos(meusAgendamentosDetails);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };
  
      if (id) {
        fetchMeusAgendamentos();
      }
    }, [id]);
  
    if (!MeusAgendamentos) {
      return <div>Loading...</div>; // ou qualquer indicador de carregamento
    }
  
    const confirmedBookings = MeusAgendamentos.filter(
      (MeusAgendamentos) => MeusAgendamentos.status === "Confirmado"
    );
    const finishedBookings = MeusAgendamentos.filter(
      (MeusAgendamentos) => MeusAgendamentos.status === "Finalizado"
    );
  
    const removeItensAgendados = (id: string) => {
      setMeusAgendamentos((prevMeusAgendamentos) =>
        prevMeusAgendamentos
          ? prevMeusAgendamentos.filter(
              (MeusAgendamentos) => MeusAgendamentos.id !== id
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
            confirmedBookings.map((MeusAgendamentos) => (
              <MeusAgendamentosItem
                key={MeusAgendamentos.id}
                MeusAgendamentos={MeusAgendamentos}
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
            finishedBookings.map((MeusAgendamentos) => (
              <MeusAgendamentosItem
                key={MeusAgendamentos.id}
                MeusAgendamentos={MeusAgendamentos}
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
}

export default MeusAgendamentos