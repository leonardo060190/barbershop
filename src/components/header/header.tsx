import { CalendarDays, CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const header = () => {
  return (
    <Card className="rounded-none border-none shadow-xl">
      <CardContent className="p-9 py-8 justify-between items-center flex flex-row">
        <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
        <div className="flex gap-3 ">
          <Button variant={"outline"}>
            <CalendarDays size={16} className="me-2" /> Agendamentos
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <CircleUserRound size={16} className="me-2 " /> Login
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default header;
