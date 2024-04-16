import {
    CircleUserRound,
    LogInIcon,
    Scissors,
    UserIcon,
  } from "lucide-react";
import {
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
  } from "../ui/sheet";
  import { Label } from "@radix-ui/react-label";
  import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const sideMenu = () => {
  return (
    <div> <SheetHeader className="text-left border-b border-solid border-secondary p-5">
    <div className="flex gap-3">
      <UserIcon />
      <SheetTitle>Faça seu Login</SheetTitle>
    </div>
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

    <SheetFooter className="text-left border-b border-solid flex justify-end sm:flex-row sm:justify-end border-secondary p-5">
      <SheetClose asChild className="px-4 mb-4">
        <Button type="submit" className="gap-3">
          <LogInIcon size={16} />
          Entrar
        </Button>
      </SheetClose>
    </SheetFooter>
  </div>

  <SheetHeader className="text-left border-b border-solid border-secondary p-5">
    <SheetTitle>Faça seu cadastro no app Aqui!</SheetTitle>
    <SheetDescription>
      Cadastre sua conta nos links abaixo, Usuario ou Barbearia!
    </SheetDescription>
  </SheetHeader>
  <SheetFooter className="text-left border-b border-solid border-secondary p-5 ">
    <div className=" flex flex-col  justify-between gap-8">
      <Link
        to={"/RegistrationPage"}
        className="flex items-center justify-center gap-2"
      >
        <CircleUserRound size={16} />
        Cadatro de Usuários
      </Link>
      <Link
        to={"RegistrationBarbershop"}
        className="flex items-center justify-center gap-2"
      >
        <Scissors size={16} />
        Cadatro de Barbearia
      </Link>
    </div>
  </SheetFooter></div>
  )
}

export default sideMenu