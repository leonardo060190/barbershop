import { useAuth } from "@/components/authProvider/AuthProvider";
import TelefoneRender from "../cadastroTelefoneCliente/TelefoneRender";
import EditCliente from "../updateCliente/EditCliente";

interface MenuSettingsProps {
  idCliente: string;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({ idCliente }) => {
  const { user } = useAuth();

  const cliente = user?.cliente;

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
          />
        )}
      </div>
    </>
  );
};

export default MenuSettings;
