import {
  CalendarDays,
  CircleUserRound,
  Home,
  LogOutIcon,
  Scissors,
  UserIcon,
} from "lucide-react";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import { Link, useNavigate } from "react-router-dom";

import FormLogin from "./formLogin/FormLogin";
import { useAuth } from "../authProvider/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface SideMenuProps {
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  const { autenticado, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  const userName =
    user?.nome || user?.cliente?.nome || user?.barbearia?.nome || undefined;

  const userFoto = user?.cliente?.foto || user?.barbearia?.foto || undefined;

  const isClienteLoggedIn = autenticado && user?.cliente;
  const isBarbeariaLoggedIn = autenticado && user?.barbearia;
  return (
    <>
      {autenticado && userName ? (
        <>
          <div className="text-left border-b border-solid border-secondary p-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={userFoto} alt={userName} />
                <AvatarFallback>
                  {userName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="capitalize">{userName}</span>
            </div>
            <Button onClick={handleLogout} className="gap-2">
              <LogOutIcon size={16} />
              Sair
            </Button>
          </div>
          {isClienteLoggedIn && (
            <div className=" justify-center text-left flex border-secondary px-3 pt-4 pb-4">
              <Link
                className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex items-center border rounded-md border-solid border-secondary px-3"
                to={"/home"}
              >
                <Home size={16} className="me-2" /> Home
              </Link>
            </div>
          )}
          {isClienteLoggedIn && (
            <div className=" justify-center text-left border-b border-solid flex border-secondary px-3 pb-4">
              <Link
                className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex items-center border rounded-md border-solid border-secondary px-3"
                to={"/bookings"}
              >
                <CalendarDays size={16} className="me-2" /> Agendamentos
              </Link>
            </div>
          )}
          {isBarbeariaLoggedIn && (
            <div className=" pt-4 justify-center text-left border-b border-solid flex border-secondary px-3 pb-4">
              <Link
                className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex items-center border rounded-md border-solid border-secondary px-3"
                to={"/bookingsBarbershop"}
              >
                <CalendarDays size={16} className="me-2" /> Agendamentos
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          <SheetHeader className="text-left border-b border-solid border-secondary p-5">
            <div className="flex gap-3">
              <UserIcon />

              <SheetTitle>Faça seu Login</SheetTitle>
            </div>
            <SheetDescription>Faça login da sua conta aqui !</SheetDescription>
          </SheetHeader>
          <FormLogin onLoginSuccess={onClose} />
          <SheetHeader className="flex items-center text-left border-b border-solid border-secondary p-5">
            <SheetTitle>Faça seu cadastro no app Aqui!</SheetTitle>
            <SheetDescription className="flex items-center">
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
      )}
    </>
  );
};

export default SideMenu;
