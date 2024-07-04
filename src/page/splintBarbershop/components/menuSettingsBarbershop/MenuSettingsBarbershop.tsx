import { useParams } from "react-router-dom";
import EditProfile from "../../components/renderForms/EditProfile";
// import RenderHorarioFuncionamento from "../../components/cadastroHorarioFuncionamento/RenderHorarioFuncionamento";
import TelefoneRender from "../../components/telefone/TelefoneRender";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import EditLogin from "../renderForms/EditLogin";

interface Telefone {
  id: string;
  numero: string;
}

interface Service {
  id: string;
  nome: string;
  foto: string;
  preco: number;
  descricao: string;
  barbeariaId: string;
}

interface Login {
  id: string;
  email: string;
  senha: string;
  dataCriacao: string;
  barbearia: BarberShop;
}

interface Endereco {
  bairro: string;
  cep: string;
  rua: string;
  numero: string;
}

interface BarberShop {
  nome: string;
  foto: string;
  avaliacao: number;
  cnpj: string;
  razaoSocial: string;
  numAvaliacoes: number;
  servicos: Service[];
  endereco?: Endereco;
  telefones: Telefone[];
  login: Login;
}

interface MenuSettingsBarbershopProps {
  onUpdate: () => void;
}

const MenuSettingsBarbershop: React.FC<MenuSettingsBarbershopProps> = ({
  onUpdate,
}) => {
  const { id } = useParams<{ id: string }>();
  const [barberShop, setBarberShop] = useState<BarberShop | null>(null);
  const [login, setLogin] = useState<Login | null>(null);

  useEffect(() => {
    const obterBarbearia = async () => {
      try {
        const response = await api.get(`/barbearia/${id}`);
        setBarberShop(response.data);
        console.log(response.data);
      } catch (error) {
        alert(`Erro: Não foi possível obter os dados: ${error}`);
      }
    };

    const obterLogin = async () => {
      try {
        const response = await api.get(`/login/barbearia/${id}`);
        setLogin(response.data);
        console.log(response.data);
      } catch (error) {
        alert(`Erro: Não foi possível obter os dados de login: ${error}`);
      }
    };

    if (id) {
      obterBarbearia();
      obterLogin();
    }
  }, [id]);

  const atualizarSplintBarbershop = async () => {
    try {
      const response = await api.get(`/barbearia/${id}`);
      setBarberShop(response.data);
      onUpdate();
    } catch (error) {
      console.error("Erro ao atualizar os serviços:", error);
    }
  };

  return (
    <>
      <div className=" grid gap-5  grid-cols-2  md:grid-cols-3 xl:grid-cols-4 ">
        <div className="py-1 px-4 ">
          {id && barberShop && (
            <EditProfile
              key={id}
              id={id}
              nome={barberShop.nome}
              foto={barberShop.foto}
              cnpj={barberShop.cnpj}
              razaoSocial={barberShop.razaoSocial}
              onProfileUpdated={atualizarSplintBarbershop}
            />
          )}
        </div>

        <div className="py-1 px-4">
          {id && (
            <TelefoneRender
              idBarbershop={id}
              onTelefoneRegistrado={atualizarSplintBarbershop}
            />
          )}
        </div>

        {/* <div className="py-1 px-4">
          <RenderHorarioFuncionamento />
        </div> */}

        <div className="py-1 px-4">
          {id && login && (
            <EditLogin
              key={login.id}
              id={login.id}
              idBarbershop={id}
              email={login.email}
              senha={login.senha}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MenuSettingsBarbershop;
