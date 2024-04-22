import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormEditProfile from "./FormEditProfile";
import { Edit } from "lucide-react";

const EditProfile = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-3 text-primary">
          <Edit size={18} />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader  className=" border-b border-solid border-secondary ">
          <DialogTitle  className="pb-3">Profile edit form</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditProfile />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
