import { CalendarDays, CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const header = () => {
  return (
    <Card>
      <CardContent className="p-9 py-8 justify-between items-center flex flex-row">
        <img src="/Logo.png" alt="FSW Barber" width={130} height={22} />
        <Button variant={"outline"}>
          <CalendarDays size={16}/> Agendamentos
        </Button>
        <Button>
          <CircleUserRound size={16} /> Perfil
        </Button>
      </CardContent>
    </Card>
  );
};

export default header;
