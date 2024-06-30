import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { DialogHeader } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import FormTelefoneCliente from "./FormCadastroTelefoneCliente";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";

interface IdClienteRegisterTelefone {
  idCliente: string;
}

interface Telefone {
  id: string;
  numero: string;
}

const TelefoneRender: React.FC<IdClienteRegisterTelefone> = ({ idCliente }) => {
  const [telefones, setTelefones] = useState<Telefone | null>(null);


  useEffect(() => {
    const obterTelefones = async () => {
      try {
        const response = await api.get(`/telefone/cliente/${idCliente}`);
        setTelefones(response.data);
        console.log("telefone",response.data);
      } catch (error) {
        alert(`Erro: Não foi possível obter os dados de login: ${error}`);
      }
    };
    obterTelefones();
  }, [idCliente]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3  items-center border-solid border-gray-600 border"
        >
          <Edit size={18} />
          Registre o telefone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3"> Registre o telefone</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormTelefoneCliente idCliente={idCliente} />
        <DialogFooter>
          {telefones && telefones.length > 0 ? (
            telefones.map((telefone) => (
              <div className="text-sm " key={telefone.id}>
                {telefone.numero}
              </div>
            ))
          ) : (
            <p>Nenhum telefone cadastrado</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TelefoneRender;
