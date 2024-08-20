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
import AtribuirServicos from "./AtribuirServicos";

type SelectServicosProps = {
  profissionalId: string;
};

const SelectServicos: React.FC<SelectServicosProps> = ({ profissionalId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3  items-center border-solid border-gray-600 border hover:text-primary"
        >
          <Edit size={18} className="text-primary" />
          Atribuir serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Atribua seus serviços</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AtribuirServicos profissionalId={profissionalId}/>
      </DialogContent>
    </Dialog>
  );
};

export default SelectServicos;
