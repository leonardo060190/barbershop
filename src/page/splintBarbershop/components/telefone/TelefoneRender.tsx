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
import FormTelefone from "./FormTelefone";

interface IdBarberShopRegisterTelefone {
  idBarbershop: string;
  onTelefoneRegistrado: () => void;
  
}

const TelefoneRender: React.FC<IdBarberShopRegisterTelefone> = ({
  idBarbershop,
  onTelefoneRegistrado,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3 text-primary flex justify-start"
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
        <FormTelefone
          idBarbershop={idBarbershop}
          onTelefoneRegistrado={onTelefoneRegistrado}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TelefoneRender;
