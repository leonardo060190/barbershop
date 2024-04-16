import { CalendarDays, CircleUserRound } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

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
                <SheetTitle>Faça seu Login</SheetTitle>
                <SheetDescription>
                  Faça login da sua conta aqui !
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4 px-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    className="col-span-3"
                    placeholder="Digite se E-mail"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    className="col-span-3"
                    placeholder="Digite sua senha"
                  />
                </div>

                <SheetFooter className="text-left border-b border-solid border-secondary p-5">
                  <SheetClose asChild className="px-4 mb-4">
                    <Button type="submit">Entrar</Button>
                  </SheetClose>
                </SheetFooter>
              </div>

              <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                <SheetTitle>Faça seu cadastro no app Aqui!</SheetTitle>
                <SheetDescription>
                  Cadastre sua conta nos links abaixo, Usuario ou Prestador de
                  serviço!
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className="text-left border-b border-solid border-secondary p-5 ">
                <div className="flex flex-col text-center">
                  <Link to={""}>Cadatro de Usuários</Link>
                  <Link to={""}>Cadatro de Barbearia</Link>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};

export default header;
