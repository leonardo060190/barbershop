import { CircleUserRound, Scissors, UserIcon } from "lucide-react";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import { Link } from "react-router-dom";

import FormLogin from "./formLogin/FormLogin";

interface SideMenuProps {
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <div className="flex gap-3">
          <UserIcon />
          <SheetTitle>Faça seu Login</SheetTitle>
        </div>
        <SheetDescription>Faça login da sua conta aqui !</SheetDescription>
      </SheetHeader>

      <FormLogin onLoginSuccess={onClose} />

      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Faça seu cadastro no app Aqui!</SheetTitle>
        <SheetDescription>
          Cadastre sua conta nos links abaixo, Usuario ou Barbearia!
        </SheetDescription>
      </SheetHeader>
      <SheetFooter className="text-left border-b border-solid border-secondary p-5 ">
        <div className=" flex flex-col  justify-between gap-8">
          <Link
            to={"/RegistrationUser"}
            className="flex items-center justify-center gap-2"
          >
            <CircleUserRound size={16} />
            Cadastro de Usuários
          </Link>
          <Link
            to={"/RegistrationBarbershop"}
            className="flex items-center justify-center gap-2"
          >
            <Scissors size={16} />
            Cadastro de Barbearias
          </Link>
        </div>
      </SheetFooter>
    </>
  );
};

export default SideMenu;
