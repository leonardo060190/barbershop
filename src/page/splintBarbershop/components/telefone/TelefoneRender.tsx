import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone } from "lucide-react";
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
          variant="outline"
          className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex justify-start items-center px-3"
          >
          <Phone size={16} className="me-2 text-primary"/>
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
