import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormEditProfile from "../forms/FormEditProfile";
import { Edit } from "lucide-react";

interface BarbershopEditProps {
  id: string;
  nome: string;
  foto: string;
  cnpj: string;
  razaoSocial: string;
  onProfileUpdated: () => void;
}

const EditProfile: React.FC<BarbershopEditProps> = ({
  id,
  foto,
  nome,
  cnpj,
  razaoSocial,
  onProfileUpdated,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3 text-primary flex justify-start"
        >
          <Edit size={18} />
          Editar Barbearia
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Editar Barbearia</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditProfile
          id={id}
          nome={nome}
          foto={foto}
          cnpj={cnpj}
          razaoSocial={razaoSocial}
          onProfileUpdated={onProfileUpdated}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
