import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Edit, X } from "lucide-react";
import FormEdit from "./FormEdit";

const ServiceItem = () => {
  // const {data} = useSession()

  return (
    <div>
      <Card className="w-full">
        <CardContent className="p-3">
          <div className="flex  gap-6 items-center">
            <div className="relative ">
              <img
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="barber"
                height={0}
                width={0}
                sizes="100vw"
                className=" rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="break-all">
                <h1 className="font-bold text-sm">Service nome</h1>
                <p className="text-sm text-gray-400">Descrição</p>
              </div>
              <div className="flex mt-12">
                <p className="text-l text-sm font-bold text-primary">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(55.4))}
                </p>
              </div>
            </div>
            <div className="flex flex-col content-around gap-3 ">
              <Button variant="secondary" className="text-[#ff6666] gap-3">
                <X size={18} />
                Delete
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" className="gap-3 text-primary">
                    <Edit size={18} />
                    To edit
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-4 border-b border-solid border-secondary">
                    <SheetTitle>Editar os serviços</SheetTitle>
                  </SheetHeader>

                  <div className="px-4 py-6">
                    <FormEdit />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItem;
