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
import { useAuth } from "@/components/authProvider/AuthProvider";

interface ClienteEditProps {
  id: string;
  nome: string;
  foto: string;
  cpf: string;
  sobreNome: string;
  dataNascimento: string;
  onClienteUpdated: () => void;
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
  const { updateUser, user } = useAuth();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-11 w-11/12 text-left hover:bg-[rgba(24,24,25,0.84)] flex "
          >
          <Edit size={16} className="me-2 text-primary" />
          Editar Cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader >
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditCliente
          id={id}
          nome={nome}
          foto={foto}
          cpf={cpf}
          sobreNome={sobreNome}
          dataNascimento={dataNascimento}
          onClienteUpdated={() => {
            onClienteUpdated();
            // Atualizar o contexto do usuário após editar o cliente
            if (user) {
              const updatedUser = {
                ...user,
                cliente: {
                  ...user.cliente,
                  id, // Atualize ou mantenha a id
                  nome,
                  foto,
                  cpf,
                  sobreNome,
                  dataNascimento,
                },
              };
              updateUser(updatedUser);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCliente;
