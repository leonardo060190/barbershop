import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import FormTelefone from "./FormTelefone";

const TelefoneRender = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-3 text-primary flex justify-start">
          <Edit size={18} />
          Register o telefone
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" border-b border-solid border-secondary ">
          <DialogTitle className="pb-3"> Register o telefone</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormTelefone/>
      </DialogContent>
    </Dialog>
  );
};

export default TelefoneRender;
