import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Edit } from "lucide-react";
  import { DialogHeader } from "../../../../components/ui/dialog";
  import { Button } from "../../../../components/ui/button";
  import FormTelefoneCliente from "./FormCadastroTelefoneCliente";
  
  interface IdClienteRegisterTelefone {
    idCliente: string;
   
    
  }
  
  const TelefoneRender: React.FC<IdClienteRegisterTelefone> = ({
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
           
          />
        </DialogContent>
      </Dialog>
    );
  };
  
  export default TelefoneRender;
  