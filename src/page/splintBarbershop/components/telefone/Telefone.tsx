import { Button } from "@/components/ui/button";
import { Smartphone, X } from "lucide-react";
import { api } from "../../../../../config/ConfigAxios";
import { useState } from "react";
import { toast } from "sonner";

interface BarbershopTelefonesProps {
  id: string;
  numero: string;
  onTelefoneDeletado: () => void;
  showDeleteButton: boolean;
}

const Telefone: React.FC<BarbershopTelefonesProps> = ({
  id,
  numero,
  onTelefoneDeletado,
  showDeleteButton,
}) => {
  const [telefone, setTelefone] = useState<BarbershopTelefonesProps[]>([]);

  const removeTelefone = async (id: string) => {
    if (!window.confirm(`Confirma a exclusão do Telefone ${numero} ?`)) {
      return;
    }
    try {
      await api.delete(`/telefone/${id}`);
      setTelefone(telefone.filter((telefone) => telefone.id !== id));
      onTelefoneDeletado();
      toast.success("Telefone Deletado com sucesso!",{
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro ao deletar o serviço:", error);
    }
  };

  return (
    <div>
      <div className="flex  items-center">
        <p className="text-sm flex gap-2 items-center">
          <Smartphone size={16} className="text-primary" />
          {numero}
        </p>
        {showDeleteButton && (
          <Button
            variant="transparent"
            className="text-[#ff6666] gap-2  ml-auto"
            onClick={() => removeTelefone(id)}
          >
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Telefone;
