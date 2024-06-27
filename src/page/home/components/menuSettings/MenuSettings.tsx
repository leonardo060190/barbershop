// import { useAuth } from "@/components/authProvider/AuthProvider";
import { useEffect, useState } from "react";
import TelefoneRender from "../cadastroTelefoneCliente/TelefoneRender";
import EditCliente from "../updateCliente/EditCliente";
import { api } from "../../../../../config/ConfigAxios";

interface MenuSettingsProps {
  idCliente: string;
}

interface Cliente {
  id: string;
  nome: string;
  foto: string;
  cpf: string;
  sobreNome: string;
  dataNascimento: string;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({ idCliente }) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
console.log(cliente)
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
    </>
  );
};

export default MenuSettings;
