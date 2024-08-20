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
import FormRegisterProfissonal from "./FormRegisterProfissonal";

interface IdBarberShopRegisterProfissional {
  idBarbershop: string;
  onProfissionalCadastrado: () => void;
}

const RegisterProfissional: React.FC<IdBarberShopRegisterProfissional> = ({
  idBarbershop,
  onProfissionalCadastrado,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3  items-center border-solid border-gray-600 border hover:text-primary"
        >
          <Edit size={18} className="text-primary" />
          Cadastro De Profissonal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Cadastre o Profissional</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormRegisterProfissonal
          idBarbershop={idBarbershop}
          onProfissionalCadastrado={onProfissionalCadastrado}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterProfissional;
