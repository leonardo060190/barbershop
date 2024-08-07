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
          variant="outline"
          className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex justify-start items-center px-3"
          >
          <Edit size={16} className=" me-2 text-primary"/>
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
