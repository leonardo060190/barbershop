import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, X } from "lucide-react";
import { DialogHeader } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import FormTelefoneCliente from "./FormCadastroTelefoneCliente";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import { toast } from "sonner";

interface IdClienteRegisterTelefone {
  idCliente: string;
}

interface Telefone {
  id: string;
  numero: string;
}

const TelefoneRender: React.FC<IdClienteRegisterTelefone> = ({ idCliente }) => {
  const [telefones, setTelefones] = useState<Telefone[]>([]);

  const onTelefoneRegistrado = () => {
    window.location.reload();
  };

  useEffect(() => {
    const obterTelefones = async () => {
      try {
        const response = await api.get(`/telefone/cliente/${idCliente}`);
        setTelefones(response.data);
        console.log("telefone", response.data);
      } catch (error) {
        alert(`Erro: Não foi possível obter os dados de login: ${error}`);
      }
    };
    obterTelefones();
  }, [idCliente]);

  const removeTelefone = async (id: string, numero: string) => {
    if (!window.confirm(`Confirma a exclusão do Telefone ${numero} ?`)) {
      return;
    }
    try {
      await api.delete(`/telefone/${id}`);
      setTelefones(telefones.filter((telefone) => telefone.id !== id));
      toast.success("Telefone Deletado com sucesso!",{
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro ao deletar o serviço:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3  items-center border-solid border-gray-600 border hover:text-primary"
        >
          <Edit size={18} className="text-primary"/>
          Registre o telefone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3"> Registre o telefone</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormTelefoneCliente
          idCliente={idCliente}
          onTelefoneRegistrado={onTelefoneRegistrado}
        />
        <DialogHeader className="py-4 border-t border-solid border-secondary ">
          Telefones cadastrados
        </DialogHeader>
        <DialogFooter>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-2  text-left text-sm font-bold">Telefones</th>
                <th className="px-2 text-left text-sm font-bold">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {telefones && telefones.length > 0 ? (
                telefones.map((telefone) => (
                  <tr
                    key={telefone.id}
                    className="flex items-center justify-between"
                  >
                    <td className="px-2 text-sm ">{telefone.numero}</td>
                    <td className="px-2 py-2 text-sm text-left">
                      <Button
                        variant="transparent"
                        className="text-[#ff6666] gap-2 ml-auto "
                        onClick={() =>
                          removeTelefone(telefone.id, telefone.numero)
                        }
                      >
                        <X size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="px-2 pt-3">Nenhum telefone cadastrado</p>
              )}
            </tbody>
          </table>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TelefoneRender;
