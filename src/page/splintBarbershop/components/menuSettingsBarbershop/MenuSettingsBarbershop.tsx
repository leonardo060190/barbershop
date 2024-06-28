import { Link, useParams } from "react-router-dom";
import EditProfile from "../../components/renderForms/EditProfile";
import RegisterOpeningHours from "../../components/renderForms/RegisterOpeningHours";
import TelefoneRender from "../../components/telefone/TelefoneRender";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import { CalendarDays } from "lucide-react";

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
}

interface MenuSettingsBarbershopProps {
  onUpdate: () => void;
}

const MenuSettingsBarbershop: React.FC<MenuSettingsBarbershopProps> = ({ onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const [barberShop, setBarberShop] = useState<BarberShop | null>(null);

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
    if (id) {
      obterBarbearia();
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
      <div className="py-1 px-4">
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

      <div className="py-1 px-4">
        <RegisterOpeningHours />
      </div>

      <div className="py-1 px-4">
        <Link
              className="h-11 w-11/12 hover:bg-[rgba(24,24,25,0.84)] flex items-center border rounded-md border-solid border-secondary px-3"
              to={"/bookingsBarbershop"}
            >
              <CalendarDays size={16} className="me-2" /> Agendamentos 
            </Link>
      </div>
    </>
  );
};

export default MenuSettingsBarbershop;
