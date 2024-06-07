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
import FormRegisterServices from "../forms/FormRegisterServices";

interface IdBarberShopRegisterServices {
  idBarbershop: string;
  onServicoRegistrado: () => void;
}

const RegisterServices: React.FC<IdBarberShopRegisterServices> = ({
  idBarbershop,
  onServicoRegistrado,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="gap-3 text-primary flex justify-start"
        >
          <Edit size={18} />
          Register services
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Register yous services</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormRegisterServices
          idBarbershop={idBarbershop}
          onServicoRegistrado={onServicoRegistrado}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterServices;
