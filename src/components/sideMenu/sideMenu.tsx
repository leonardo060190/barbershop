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
import EditCliente from "@/page/home/components/updateCliente/EditCliente";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import TelefoneRender from "@/page/home/components/cadastroTelefoneCliente/TelefoneRender";
import EditLoginCliente from "@/page/home/components/updateLoginCliente/EdilLoginCliente";
import MenuSettingsBarbershop from "@/page/splintBarbershop/components/menuSettingsBarbershop/MenuSettingsBarbershop";

interface SideMenuProps {
  onClose: () => void;
}

interface Login {
  id: string;
  email: string;
  senha: string;
  dataCriacao: string;
  cliente: Cliente;
}

interface Cliente {
  id: string;
  nome: string;
  foto: string;
  cpf: string;
  sobreNome: string;
  dataNascimento: string;
  login: Login;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose }) => {
  const { autenticado, user, logout } = useAuth();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [login, setLogin] = useState<Login | null>(null);

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  const idCliente = user?.cliente?.id || null;

  const fetchCliente = useCallback(async () => {
    try {
      const response = await api.get(`/cliente/${idCliente}`);
      setCliente(response.data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  }, [idCliente]);

  const obterLogin = useCallback(async () => {
    try {
      const response = await api.get(`/login/cliente/${idCliente}`);
      setLogin(response.data);
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados de login: ${error}`);
    }
  }, [idCliente]);

  useEffect(() => {
    if (idCliente) {
      fetchCliente();
      obterLogin();
    }
  }, [fetchCliente, idCliente, obterLogin]);

  const atualizarEditCliente = async () => {
    try {
      const response = await api.get(`/cliente/${idCliente}`);
      setCliente(response.data);
    } catch (error) {
      console.error("Erro ao atualizar os serviços:", error);
    }
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
                <Home size={16} className="me-2 text-primary" /> Home
              </Link>
            </div>
          )}
          {isClienteLoggedIn && (
            <div className=" justify-center text-left border-b border-solid flex border-secondary px-3 pb-4">
              <Link
                className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex items-center border rounded-md border-solid border-secondary px-3"
                to={"/bookings"}
              >
                <CalendarDays size={16} className="me-2 text-primary" />{" "}
                Agendamentos
              </Link>
            </div>
          )}

          {isClienteLoggedIn && (
            <div className=" pt-4 justify-center text-left flex px-3 pb-4">
              {cliente && (
                <EditCliente
                  id={cliente.id}
                  nome={cliente.nome}
                  foto={cliente.foto}
                  cpf={cliente.cpf}
                  sobreNome={cliente.sobreNome}
                  dataNascimento={cliente.dataNascimento}
                  onClienteUpdated={atualizarEditCliente}
                />
              )}
            </div>
          )}
          {isClienteLoggedIn && (
            <div className=" justify-center text-left flex px-3 pb-4">
              {idCliente && <TelefoneRender idCliente={idCliente} />}
            </div>
          )}
          {isClienteLoggedIn && (
            <div className=" justify-center text-left border-b border-solid flex border-secondary px-3 pb-4">
              {idCliente && login && (
                <EditLoginCliente
                  key={login.id}
                  id={login.id}
                  idCliente={idCliente}
                  email={login.email}
                  senha={login.senha}
                />
              )}
            </div>
          )}

          {isBarbeariaLoggedIn && (
            <>
              <div className=" pt-4 justify-center text-left flex px-3 ">
                <Link
                  className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex items-center border rounded-md border-solid border-secondary px-3"
                  to={`/splintbarbershop/${user?.barbearia?.id}`} // Redireciona para a barbearia específica se for barbearia
                >
                  <Home size={16} className="me-2 text-primary" /> Barbershop
                </Link>
              </div>

              <div className=" pt-4 justify-center text-left border-b border-solid flex border-secondary px-3 pb-4">
                <Link
                  className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex items-center border rounded-md border-solid border-secondary px-3"
                  to={"/bookingsBarbershop"}
                >
                  <CalendarDays size={16} className="me-2 text-primary" />{" "}
                  Agendamentos
                </Link>
              </div>

              <div className=" pt-4 justify-center text-left border-b border-solid flex border-secondary px-3 pb-4">
                <MenuSettingsBarbershop onUpdate={atualizarEditCliente} />
              </div>
            </>
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
              Cadastre sua conta nos links abaixo, Usuário ou Barbearia!
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="text-left border-b border-solid border-secondary p-5 ">
            <div className="w-full justify-between text-left  gap-4 border-solid flex flex-col border-secondary px-3 ">
              <Link
                to={"/RegistrationUser"}
                className="h-11 w-full hover:bg-[rgba(24,24,25,0.84)] gap-4 flex items-center justify-center border rounded-md border-solid border-secondary px-3"
              >
                <CircleUserRound size={18} className="text-primary" />
                Cadastro de Usuários
              </Link>

              <Link
                to={"/RegistrationBarbershop"}
                className="h-11 w-full hover:bg-[rgba(24,24,25,0.84)] gap-4 flex items-center justify-center border rounded-md border-solid border-secondary px-3"
              >
                <Scissors size={18} className="text-primary" />
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
