import { CalendarDays, CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router-dom";
import SideMenu from "@/components/sideMenu/sideMenu";
import AddressRegistration from "../form/formsRender/AddressRegistration";
import { useState } from "react";

const Header = () => {

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetOpen = () => setIsSheetOpen(true);
  const handleSheetClose = () => setIsSheetOpen(false);

  return (
    <Card className="rounded-none border-none shadow-xl">
      <CardContent className="p-9 py-8 justify-between items-center flex flex-row">
        
        <Link to={"/"}>
          <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
        </Link>

        <div className="flex gap-3 ">
          <Link
            className="flex items-center border px-2 rounded-md border-solid border-secondary "
            to={"/bookings"}
          >
            <CalendarDays size={16} className="me-2" /> Agendamentos
          </Link>

          <AddressRegistration />

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button onClick={handleSheetOpen}>
                <CircleUserRound size={16} className="me-2 " /> Login
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <SideMenu onClose={handleSheetClose}/>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
