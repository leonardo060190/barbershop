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

const RegisterServices = () => {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="gap-3 text-primary">
              <Edit size={18} />
              Register services
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader  className=" border-b border-solid border-secondary ">
              <DialogTitle  className="pb-3">Register yous services</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <FormRegisterServices />
          </DialogContent>
        </Dialog>
      );
}

export default RegisterServices