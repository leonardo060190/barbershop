import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit } from "lucide-react";
import FormRegisterServices from "./FormRegisterServices";

interface IdBarberShopRegisterServices {
  idBarbershop: string;
  // onServicoRegistrado: () => void;
}

const RegisterServices: React.FC<IdBarberShopRegisterServices> = ({
  idBarbershop,
  // onServicoRegistrado,
}) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3  items-center border-solid border-gray-600 border hover:text-primary"
        >
          <Edit size={18} className="text-primary"/>
          Cadastro serviços
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Cadastre seu serviços</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormRegisterServices
          idBarbershop={idBarbershop}
          // onServicoRegistrado={onServicoRegistrado}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterServices;
