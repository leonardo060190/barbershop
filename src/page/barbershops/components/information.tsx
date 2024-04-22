
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
 } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Smartphone } from "lucide-react";

const information = () => {
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
              <p className="text-sm flex gap-3 items-center">
                <Smartphone size={16} className="text-primary" />
                485555555
              </p>

              <p className="text-sm flex gap-3 items-center">
                <Smartphone size={16} className="text-primary" />
                485555555
              </p>
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

export default information;
