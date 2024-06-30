import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormEditLogin from "../forms/FormEditLogin";
import { Edit } from "lucide-react";

interface BarbershopEditLoginProps {
  id: string;
  senha: string;
  email: string;
  idBarbershop: string;
}

const EditLogin: React.FC<BarbershopEditLoginProps> = ({
  id,
  senha,
  email,
  idBarbershop,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3  items-center border-solid border-gray-600 border"
        >
          <Edit size={18} />
          Editar Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Editar Login</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditLogin
          id={id}
          senha={senha}
          email={email}
          idBarbershop={idBarbershop}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditLogin;
