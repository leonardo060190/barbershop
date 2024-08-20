import { Card, CardContent } from "@/components/ui/card";
import RegisterServices from "./RegisterServices";
import { useAuth } from "@/components/authProvider/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import { toast } from "sonner";
import EditServices from "./EditServices";
import Header from "@/components/header/header";

interface ServicosBarbershop {
  id: string;
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
}

interface BarbeariaResponse {
  id: string;
  nome: string;
  servicos: {
    id: string;
    nome: string;
    foto: string;
    preco: number;
    descricao: string;
  }[];
}

const ServicosPage = () => {
  const { user } = useAuth();
  const id = user?.barbearia?.id || "";
  const [servicos, setServicos] = useState<ServicosBarbershop[]>([]);

  const obterServicosBarbershop = useCallback(async () => {
    try {
      const response = await api.get<BarbeariaResponse>(`/barbearia/${id}`);
      console.log("Resposta da API:", response.data);

      // Verifique o formato de response.data.servicos
      if (response.data && Array.isArray(response.data.servicos)) {
        const servicosData = response.data.servicos.map((item) => ({
          id: item.id,
          nome: item.nome,
          foto: item.foto,
          preco: item.preco,
          descricao: item.descricao,
        }));
        setServicos(servicosData);
      } else {
        console.error("Formato inesperado dos dados:", response.data);
        toast.error("Erro: Dados recebidos estão em formato inesperado.", {
          style: {
            backgroundColor: "#ff0000", // Cor de fundo
            color: "#FFFFFF", // Cor do texto
          },
        });
      }
    } catch (error) {
      toast.error(`Erro: Não foi possível obter os dados: ${error}`, {
        style: {
          backgroundColor: "#ff0000", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      obterServicosBarbershop();
    }
  }, [id, obterServicosBarbershop]);

  const atualizarSplintBarbershop = () => {
    obterServicosBarbershop();
  };

  return (
    <>
      <Header />
      <div className="pt-4 px-6 py-4">
        <Card>
          <CardContent className="p-0">
            <div className="px-12 p-3 flex justify-between">
              <h1 className="p-1 font-semibold text-xl">Serviços</h1>
              <RegisterServices idBarbershop={id} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className=" px-6 grid gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-4 pb-4">
        {servicos.length > 0 ? (
          servicos.map((servico) => (
            <EditServices
              key={servico.id}
              id={servico.id}
              barbeariaId={id}
              nome={servico.nome}
              foto={servico.foto}
              descricao={servico.descricao}
              preco={servico.preco}
              onServicoDeletado={atualizarSplintBarbershop}
              onServicoUpdated={atualizarSplintBarbershop}
            />
          ))
        ) : (
          <div>Nenhum serviço disponível</div>
        )}
      </div>
    </>
  );
};

export default ServicosPage;
