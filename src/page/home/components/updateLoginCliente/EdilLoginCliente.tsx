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
