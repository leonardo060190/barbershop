import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../../config/ConfigAxios";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";

interface ProfissionalServicos {
  id: string;
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
}

interface ServicoResponse {
  id: string;
  servico: {
    nome: string;
    foto: string;
    preco: number;
    descricao: string;
  };
  profissional: {
    // Defina as propriedades de profissional se precisar delas
  };
}

const ServicosProfissional = () => {
  const { id } = useParams<{ id: string }>();

  const [servicos, setServicos] = useState<ProfissionalServicos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const obterProfissionalServicos = useCallback(async () => {
    try {
      // Obter IDs dos serviços
      const response = await api.get<ServicoResponse[]>(
        `/profissionalServico/profissional/${id}`
      );
      console.log("Resposta da API:", response.data);

      // Verifique o formato de response.data aqui
      if (Array.isArray(response.data)) {
        const servicosData = response.data.map((item) => {
          return {
            id: item.id,
            nome: item.servico.nome,
            foto: item.servico.foto,
            preco: item.servico.preco,
            descricao: item.servico.descricao,
          };
        });
        setServicos(servicosData);
      } else {
        console.error("Formato inesperado dos dados:", response.data);
        toast.error("Erro: Dados recebidos estão em formato inesperado.");
      }
    } catch (error) {
      toast.error(`Erro: Não foi possível obter os dados: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const removeServico = async (id: string) => {
    const servicoParaRemover = servicos.find((servico) => servico.id === id);
    if (servicoParaRemover) {
      if (
        !window.confirm(
          `Confirma a exclusão do serviço: ${servicoParaRemover.nome} ?`
        )
      ) {
        return;
      }
    }
    try {
      await api.delete(`/profissionalServico/${id}`);
      setServicos(servicos.filter((servico) => servico.id !== id));
      toast.success("Serviço deletado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
        },
      });
    } catch (error) {
      toast.error(`Erro ao deletar o serviço: ${error}`);
    }
  };

  useEffect(() => {
    obterProfissionalServicos();
  }, [obterProfissionalServicos]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className=" grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
      {servicos.map((servico) => (
        <div key={servico.id} className="w-full h-full">
          <Card className="w-full">
            <CardContent className="p-3">
              <div className="flex gap-6 items-center">
                <div className="relative ">
                  <img
                    src={servico.foto}
                    alt={servico.nome}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className=" rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="break-all">
                    <h1 className="font-bold text-sm">{servico.nome}</h1>
                    <p className="text-sm text-gray-400">{servico.descricao}</p>
                  </div>
                  <div className="flex mt-12">
                    <p className="text-l text-sm font-bold text-primary">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(servico.preco)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col content-around gap-3 ">
                  <Button
                    variant="secondary"
                    className="text-[#ff6666] gap-3"
                    onClick={() => removeServico(servico.id)}
                  >
                    <X size={18} />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ServicosProfissional;
