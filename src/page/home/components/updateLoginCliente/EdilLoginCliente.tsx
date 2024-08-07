import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormUpdateLoginCliente from "./FormUpdateLoginCliente";
import { Edit } from "lucide-react";

interface ClientepEditLoginProps {
  id: string;
  senha: string;
  email: string;
  idCliente: string;
}

const EditLoginCliente: React.FC<ClientepEditLoginProps> = ({
  id,
  senha,
  email,
  idCliente,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
         variant="outline"
         className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex justify-start items-center px-3"
         >
          <Edit size={16} className="me-2 text-primary"/>
          Editar Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Editar Login</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormUpdateLoginCliente
          id={id}
          senha={senha}
          email={email}
          idCliente={idCliente}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditLoginCliente;
