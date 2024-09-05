import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/authProvider/AuthProvider";
// import { BackgroundGradient } from "@/components/ui/background-gradient";

interface BarbershopItemProps {
  id: string;
  foto: string;
  nome: string;
  rua?: string;
}

const BarbershopItemPopulares: React.FC<BarbershopItemProps> = ({
  id,
  foto,
  nome,
  rua,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const { autenticado } = useAuth();

  const hadleBookingClick = () => {
    if (autenticado) {
      navigate(`/barberShops/${id}`);
    }
  };

  return (
    
      <div key={id}>
         {/* <BackgroundGradient> */}
        <Card className="min-w-[167px] max-w-[167px] h-[300px]  rounded-2xl">
          <CardContent className="p-0 pt-1 h-full flex flex-col justify-between">
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
                className="h-[159px] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="px-3 pb-3">
              <h2 className="font-bold mt-2 text-ellipsis overflow-hidden whitespace-nowrap">
                {nome}
              </h2>
              <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
                {rua || "Endereço indisponivel"}
              </p>
              <Button
                className=" w-full mt-3 rounded-2xl hover:text-primary"
                variant="secondary"
                onClick={hadleBookingClick}
                disabled={!autenticado}
              >
                Reservar
              </Button>
            </div>
          </CardContent>
        </Card>
      {/* </BackgroundGradient> */}
      </div> 
   
  );
};

export default BarbershopItemPopulares;
