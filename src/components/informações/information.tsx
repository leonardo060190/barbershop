import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Telefone from "../../page/splintBarbershop/components/telefone/Telefone";
import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface InformationTelefoneProps {
  telefones: { id: string; numero: string }[];
  onTelefoneDeletado: () => void;
  showDeleteButton: boolean;
}

const Information: React.FC<InformationTelefoneProps> = ({
  telefones,
  onTelefoneDeletado,
  showDeleteButton,
}) => {
  return (
    <div>
      <Card className="px-3 py-3 max-w-[24rem] min-w-[18rem] break-all">
        <div className="relative ">
          <img
            className="w-full h-full"
            src="/BarberShopCard.png"
            alt="barber"
          />

          <CardHeader>
            Sobre nós
            <CardDescription className="py-3 break-all border-b border-solid border-secondary">
              <p>informações...</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-5 pt-0 flex flex-col gap-4  border-b border-solid border-secondary">
              {telefones.length > 0 ? (
                telefones.map((telefone) => (
                  <Telefone
                    key={telefone.id}
                    id={telefone.id}
                    numero={telefone.numero}
                    onTelefoneDeletado={onTelefoneDeletado}
                    showDeleteButton={showDeleteButton}
                  />
                ))
              ) : (
                <div>Nenhum telefone disponível</div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex justify-between ">
                <h2 className="font-bold">Horario de funcionamento</h2>
                <h3 className="font-bold text-sm"></h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Segunda</h3>
                <h4 className="text-sm "></h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Terça-feira</h3>
                <h4 className="text-sm "></h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Quarta-feira</h3>
                <h4 className="text-sm "></h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Quinta-feira</h3>
                <h4 className="text-sm "></h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Sexta-feira</h3>
                <h4 className="text-sm "></h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Sábado</h3>
                <h4 className="text-sm "></h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Domingo</h3>
                <h4 className="text-sm "></h4>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Information;
