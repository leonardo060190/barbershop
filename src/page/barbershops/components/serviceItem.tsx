import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";

const serviceItem = () => {
  return (
    <div>
      <Card>
        <CardContent className="p-3">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <img
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="barber"
                height={0}
                width={0}
                sizes="100vw"
                className="min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] rounded-2xl"
              />
            </div>

            <div className="flex flex-col w-full">
              <h1 className="font-bold text-sm">Service nome</h1>
              <p className="text-sm text-gray-400">Descrição...</p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-l text-sm font-bold text-primary">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(55.4))}
                </p>
                <Button variant="secondary" className="text-primary">
                  Reservar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default serviceItem;
