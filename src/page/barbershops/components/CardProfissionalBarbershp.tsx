import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface BarbershopProfissionaisProps {
  id: string;
  nome: string;
  sobreNome: string;
  foto: string;
  barbeariaId: string;
}

const CardProfissionaLBarbershop: React.FC<BarbershopProfissionaisProps> = ({
  id,
  foto,
  nome,
  sobreNome,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/profissional_Reserva_Servico_Page/${id}`);
  };

  return (
    <div key={id}>
      <Card className="w-full  cursor-pointer " onClick={handleCardClick}>
        <CardContent className="p-3">
          <div className="flex  gap-6 items-center">
            <div className="relative ">
              <img
                src={foto}
                alt={nome}
                height={0}
                width={0}
                sizes="100vw"
                className="rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="break-all">
                <h1 className=" font-normal capitalize text-sm">{`${nome} ${sobreNome}`}</h1>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardProfissionaLBarbershop;
