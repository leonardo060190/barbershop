import { CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router-dom";
import SideMenu from "@/components/sideMenu/sideMenu";
import { useState } from "react";
import { useAuth } from "../authProvider/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  const { autenticado, user } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleSheetOpen = () => setIsSheetOpen(true);
  const handleSheetClose = () => setIsSheetOpen(false);

  const userName =
    user?.nome || user?.cliente?.nome || user?.barbearia?.nome || undefined;

  const userFoto = user?.cliente?.foto || user?.barbearia?.foto || undefined;

  return (
    <Card className="rounded-none border-none shadow-xl">
      <CardContent className="p-9 py-8 justify-between items-center flex flex-row">
        <Link to={"/"}>
          <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
        </Link>
        <div className="flex gap-3 ">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              {autenticado ? (
                <Avatar className="cursor-pointer">
                  <AvatarImage src={userFoto} alt={userName} />
                  <AvatarFallback>
                    {userName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Button onClick={handleSheetOpen}>
                  <CircleUserRound size={16} className="me-2 " /> Login
                </Button>
              )}
            </SheetTrigger>
            <SheetContent className="p-0">
              <SideMenu onClose={handleSheetClose} />
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
