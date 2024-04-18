import {
  CalendarDays,
  CircleUserRound,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { Link } from "react-router-dom";
import SideMenu from "@/components/sideMenu/sideMenu"

const header = () => {
  return (
    <Card className="rounded-none border-none shadow-xl">
      <CardContent className="p-9 py-8 justify-between items-center flex flex-row">
        <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
        <div className="flex gap-3 ">

          <Link className="flex items-center border px-2 rounded-md border-solid border-secondary " to={"/bookings"}>
            <CalendarDays size={16} className="me-2" /> Agendamentos
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <CircleUserRound size={16} className="me-2 " /> Login
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
             <SideMenu/>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default header;
