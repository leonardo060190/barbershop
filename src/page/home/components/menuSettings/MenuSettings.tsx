// import { useAuth } from "@/components/authProvider/AuthProvider";
import { useEffect, useState } from "react";
import TelefoneRender from "../cadastroTelefoneCliente/TelefoneRender";
import EditCliente from "../updateCliente/EditCliente";
import { api } from "../../../../../config/ConfigAxios";
import EditLoginCliente from "../updateLoginCliente/EdilLoginCliente";

interface MenuSettingsProps {
  idCliente: string;
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

const MenuSettings: React.FC<MenuSettingsProps> = ({ idCliente }) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [login, setLogin] = useState<Login | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/cliente/${idCliente}`);
        setCliente(response.data);
        console.log("ooi",response.data)
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    const obterLogin = async () => {
      try {
        const response = await api.get(`/login/cliente/${idCliente}`);
        setLogin(response.data);
        console.log(response.data);
      } catch (error) {
        alert(`Erro: Não foi possível obter os dados de login: ${error}`);
      }
    };
    obterLogin();
    fetchCliente();
  }, [idCliente]);
  
  const atualizarEditCliente = async () => {
    try {
      const response = await api.get(`/cliente/${idCliente}`);
      setCliente(response.data);
    } catch (error) {
      console.error("Erro ao atualizar os serviços:", error);
    }
  };

  return (
    <>
      <div className="py-1 px-4">
        <TelefoneRender idCliente={idCliente} />
      </div>
      <div className="py-1 px-4">
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
      <div className="py-1 px-4">
      {idCliente && login && (
          <EditLoginCliente
            key={login.id}
            id={login.id}
            idCliente ={idCliente}
            email={login.email}
            senha={login.senha}
            
          />
        )}
      </div>
    </>
  );
};

export default MenuSettings;
