import { Button } from "@/components/ui/button";
import { Smartphone, X } from "lucide-react";
import { api } from "../../../../../config/ConfigAxios";
import { useState } from "react";

interface BarbershopTelefonesProps {
  id: string;
  numero: string;
  onTelefoneDeletado: () => void;
}

const Telefone: React.FC<BarbershopTelefonesProps> = ({
  id,
  numero,
  onTelefoneDeletado,
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
        <Button
          variant="transparent"
          className="text-[#ff6666] gap-2  ml-auto"
          onClick={() => removeTelefone(id)}
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Telefone;
