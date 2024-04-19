import Header from "@/components/header/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const information = () => {
  return (
    <div>
      <Card className="px-3 py-3">
        <div className="relative ">
          <img
            className="w-full h-[180px]"
            src="/BarberShopCard.png"
            alt="barber"
          />

          <CardHeader>
            Sobre nós
            <CardDescription className="border-b border-solid border-secondary">
              informações...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-sm">485555555</p>
            </div>
            <div className=" border-b border-solid border-secondary">
              <p className="text-sm">485555555</p>
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
