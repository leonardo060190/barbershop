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
import FormRegisterOpeningHours from "../forms/FormRegisterOpeningHours";

const RegisterOpeningHours = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-3 text-primary">
          <Edit size={18} />
          Register opening hours
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3">Opening hours</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormRegisterOpeningHours />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterOpeningHours;
