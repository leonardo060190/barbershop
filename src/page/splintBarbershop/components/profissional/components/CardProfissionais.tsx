import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "../../../../../../config/ConfigAxios";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface BarbershopProfissionaisProps {
  id: string;
  nome: string;
  sobreNome: string;
  foto: string;
  barbeariaId: string;
}

const CardProfissionais: React.FC<BarbershopProfissionaisProps> = ({
  id,
  foto,
  nome,
  sobreNome,
}) => {
  const [profissional, setProfissional] = useState<
    BarbershopProfissionaisProps[]
  >([]);
  const navigate = useNavigate();

  const removeServico = async (id: string) => {
    if (!window.confirm(`Confirma a exclusão do serviço ${nome} ?`)) {
      return;
    }
    try {
      await api.delete(`/profissional/${id}`);
      setProfissional(
        profissional.filter((profissional) => profissional.id !== id)
      );

      toast.success("Profissonal Deletado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      toast.error(`Erro: Não foi possível obter os dados: ${error}`, {
        style: {
          backgroundColor: "#ff0000", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/profissionalDetails/${id}`);
  };

  return (
    <div key={id}>
      <Card className="w-full">
        <CardContent className="p-3">
          <div className="flex  gap-6 items-center">
            <div className="relative ">
              <img
                onClick={handleCardClick}
                src={foto}
                alt={nome}
                height={0}
                width={0}
                sizes="100vw"
                className=" cursor-pointer rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="break-all">
                <h1
                  className="cursor-pointer font-normal capitalize text-sm"
                  onClick={handleCardClick}
                >{`${nome} ${sobreNome}`}</h1>
              </div>
            </div>

            <Button
              variant="secondary"
              className="text-[#ff6666] gap-3 "
              onClick={() => removeServico(id)}
            >
              <X size={18} />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardProfissionais;
