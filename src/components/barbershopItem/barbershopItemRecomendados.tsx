import { StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

interface BarbershopItemProps {
  id: string;
  foto: string;
  nome: string;
  endereco: string;
}

const BarbershopItemRecomendados: React.FC<BarbershopItemProps> = ({
  id,
  foto,
  nome,
  endereco,
}) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const hadleBookingClick = () => {
    navigate("/BarberShops");
  };

  return (
    <div key={id}>
      <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
        <CardContent className="p-0 pt-1 ">
          <div className="px-1 relative">
            <Badge
              variant="secondary"
              className=" opacity-90 gap-1 absolute top-1 right-2"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span>5,0</span>
            </Badge>
            <img
              src={foto}
              alt={nome}
              height={0}
              width={0}
              sizes="100vw"
              className="h-[159px] w-full rounded-2xl"
            />
          </div>

          <div className="px-3 pb-3">
            <h2 className="font-bold mt-2">{nome}</h2>
            <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
              {endereco}
            </p>
            <Button
              className=" w-full mt-3 rounded-2xl"
              variant="secondary"
              onClick={hadleBookingClick}
            >
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarbershopItemRecomendados;
