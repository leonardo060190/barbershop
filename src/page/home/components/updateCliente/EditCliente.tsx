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
import FormEditCliente from "../updateCliente/FormEditCliente";

interface ClienteEditProps {
  id: string;
  nome: string;
  foto: string;
  cpf: string;
  sobreNome: string;
  dataNascimento: string;
  onClienteUpdated: ()=> void;
}

const EditCliente: React.FC<ClienteEditProps> = ({
  id,
  foto,
  nome,
  cpf,
  sobreNome,
  dataNascimento,
  onClienteUpdated,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3 items-center border-solid border-gray-600 border"
        >
          <Edit size={18} />
          Editar Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Editar Cliente</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditCliente
          id={id}
          nome={nome}
          foto={foto}
          cpf={cpf}
          sobreNome={sobreNome}
          dataNascimento={dataNascimento}
          onClienteUpdated={onClienteUpdated}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCliente;
