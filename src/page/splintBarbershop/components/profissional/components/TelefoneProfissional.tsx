import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { DialogHeader } from "../../../../../components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import FormTelefoneProfissional from "./FormTelefoneProfissional";

interface IdProfissionalRegisterTelefone {
  idProfissional: string;
}

const TelefoneProfissional: React.FC<IdProfissionalRegisterTelefone> = ({
  idProfissional,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="transparent">
          <Plus size={20} className=" text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3"> Registre o telefone</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormTelefoneProfissional idProfissional={idProfissional}  />
      </DialogContent>
    </Dialog>
  );
};
export default TelefoneProfissional;
