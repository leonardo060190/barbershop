import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../../../../components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit, X } from "lucide-react";
import FormEditService from "./FormEditService";
import { api } from "../../../../../config/ConfigAxios";
import { useState } from "react";
import { toast } from "sonner";

interface BarbershopServicosProps {
  id: string;
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
  barbeariaId: string;
  onServicoDeletado: () => void;
  onServicoUpdated: () => void;
}

const EditServices: React.FC<BarbershopServicosProps> = ({
  id,
  foto,
  nome,
  preco,
  descricao,
  barbeariaId,
  onServicoDeletado,
  onServicoUpdated,
}) => {
  const [servico, setServico] = useState<BarbershopServicosProps[]>([]);

  const removeServico = async (id: string) => {
    if (!window.confirm(`Confirma a exclusão do serviço ${nome} ?`)) {
      return;
    }
    try {
      await api.delete(`/servico/${id}`);
      setServico(servico.filter((servico) => servico.id !== id));
      onServicoDeletado();
      toast.success("Serviço Deletado com sucesso!",{
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

  return (
    <div key={id}>
      <Card className="w-full">
        <CardContent className="p-3">
          <div className="flex  gap-6 items-center">
            <div className="relative ">
              <img
                src={foto}
                alt={nome}
                height={0}
                width={0}
                sizes="100vw"
                className=" rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="break-all">
                <h1 className="font-bold text-sm">{nome}</h1>
                <p className="text-sm text-gray-400">{descricao}</p>
              </div>
              <div className="flex mt-12">
                <p className="text-l text-sm font-bold text-primary">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(preco)}
                </p>
              </div>
            </div>
            <div className="flex flex-col content-around gap-3 ">
              <Button
                variant="secondary"
                className="text-[#ff6666] gap-3"
                onClick={() => removeServico(id)}
              >
                <X size={18} />
                Delete
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-3 text-primary">
                    <Edit size={18} />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className=" border-b border-solid border-secondary ">
                    <DialogTitle className="pb-3">Editar Serviços</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <FormEditService
                    id={id}
                    nome={nome}
                    foto={foto}
                    preco={preco}
                    descricao={descricao}
                    barbeariaId={barbeariaId}
                    onServicoUpdated={onServicoUpdated}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditServices;
