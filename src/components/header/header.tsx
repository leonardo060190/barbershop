import { CalendarDays, CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const header = () => {
  return (
    <Card className="rounded-none border-none shadow-xl">
      <CardContent className="p-9 py-8 justify-between items-center flex flex-row">
        <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
       <div className="flex gap-3 ">
        <Button variant={"outline"} >
          <CalendarDays size={16} className="me-3"/> Agendamentos
        </Button>
        <Button>
          <CircleUserRound size={16} className="me-3 "/> Perfil
        </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default header;
