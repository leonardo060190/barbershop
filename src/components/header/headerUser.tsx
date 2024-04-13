import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Search from "@/components/layout/search";

const headerUser = () => {
  return (
    <Card className="rounded-none border-none shadow-xl">
      <CardContent className="p-8 py-6 flex items-center flex-col md:flex-row justify-between gap-7">
        <div className=" pb-4 py-4 items-center flex  ">
          <img
            src="/Logo.png"
            alt="FSW Barber"
            width={135}
            height={22}
            className="me-5"
          />

          <div className="w-96">
            <Search />
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <Button variant={"outline"}>
              <CalendarDays size={16} className="me-3" /> Agendamentos
            </Button>
          </div>

          <div className="">
            <Button variant={"ghost"} className="flex items-center w-56">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default headerUser;
