
import { Smartphone } from "lucide-react";

interface BarbershopTelefonesProps {
  numero: string;
}

const Telefone: React.FC<BarbershopTelefonesProps> = ({ numero }) => {
  return (
    <div>
        <p className="text-sm flex gap-3 items-center">
          <Smartphone size={16} className="text-primary" />
          {numero}
        </p>
    </div>
  );
};

export default Telefone;
