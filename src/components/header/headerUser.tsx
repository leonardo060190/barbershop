import { CalendarDays, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../ui/input";

const headerUser = () => {
  return (
    <Card>
      <CardContent className="p-9 py-8 items-center flex flex-row">
        <img
          src="/Logo.png"
          alt="FSW Barber"
          width={130}
          height={22}
          className="me-5"
        />

        <div className="flex flex-grow max-w-xl space-x-2 ">
          <Input type="text" placeholder="Buscar Barbearias" />

          <Button type="submit">
            <Search size={16} />
          </Button>
        </div>

        <div className="justify-end">
          <Button variant={"outline"}>
            <CalendarDays size={16} className="me-3" /> Agendamentos
          </Button>
        </div>

        <div className="flex flex-row">
          <Button variant={"ghost"} className="flex items-center ">
            <Avatar className="me-3">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="LD"
                width={30}
                className="rounded-full"
              />
              <AvatarFallback>LD</AvatarFallback>
            </Avatar>
            Leonardo Domingos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default headerUser;
