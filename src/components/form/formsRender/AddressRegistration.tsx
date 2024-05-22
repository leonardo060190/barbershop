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
import FormAddress from "../FormAddress";

const AddressRegistration = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-3 text-primary flex justify-start">
          <Edit size={18} />
          Register o endereço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Register o endereço</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormAddress />
      </DialogContent>
    </Dialog>
  );
};

export default AddressRegistration;
