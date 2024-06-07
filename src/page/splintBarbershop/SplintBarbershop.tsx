import Header from "@/components/header/header";
// import { Card, CardContent } from "@/components/ui/card";
// import { StarIcon } from "lucide-react";
import EditServices from "./components/renderForms/EditServices";
import EditProfile from "./components/renderForms/EditProfile";
import RegisterServices from "./components/renderForms/RegisterServices";
import RegisterOpeningHours from "./components/renderForms/RegisterOpeningHours";
import TelefoneRender from "./components/telefone/TelefoneRender";
import Information from "../../components/informações/information";
import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import { useParams } from "react-router-dom";

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

const SplintBarbershop = () => {
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
    } catch (error) {
      console.error("Erro ao atualizar os serviços:", error);
    }
  };

  if (!barberShop) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <div className="px-12 max-w-[100rem] min-w-[32rem] flex flex-col md:flex-row">
        <div>
          <div className="pb-6">
            <div className=" pt-10 ">
              <img
                src={barberShop.foto}
                alt={barberShop.nome}
                className="object-cover rounded-2xl"
                width={958}
                height={687}
              />
            </div>

            <div className="flex justify-between pb-6 border-b border-solid border-secondary">
              <div className=" pt-6 flex flex-col gap-4">
                <h1 className="text-xl font-bold">{barberShop.nome}</h1>
                <div className="flex gap-3">
                  <div className="grid gap-2 grid-cols-2 md-grid-cols-3 xl:grid-cols-4">
                    {id && (
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
                    {id && (
                      <RegisterServices
                        idBarbershop={id}
                        onServicoRegistrado={atualizarSplintBarbershop}
                      />
                    )}
                    <RegisterOpeningHours />
                    {id && (
                      <TelefoneRender
                        idBarbershop={id}
                        onTelefoneRegistrado={atualizarSplintBarbershop}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="mt-5">
                <Card>
                  <CardContent className="px-4 py-3">
                    <div className="flex gap-2 px-6 items-center">
                      <StarIcon
                        size={18}
                        className="fill-primary text-primary"
                      />
                      <p>5.0</p>
                    </div>
                    (899 avaliações)
                  </CardContent>
                </Card>
              </div> */}
            </div>
          </div>

          <div className=" pb-6 flex-wrap justify-center">
            <h1 className="text-xl font-bold py-6">Serviços Regitrados</h1>
            <div className=" grid gap-5  grid-cols-1  xl:grid-cols-2">
              {barberShop.servicos?.length > 0 ? (
                barberShop.servicos.map((servico) => (
                  <EditServices
                    key={servico.id} // Use um identificador único se disponível
                    id={servico.id}
                    barbeariaId={id || ""}
                    nome={servico.nome}
                    foto={servico.foto}
                    descricao={servico.descricao}
                    preco={servico.preco}
                    onServicoDeletado={atualizarSplintBarbershop}
                    onServicoUpdated={atualizarSplintBarbershop}
                  />
                ))
              ) : (
                <div>Nenhum serviço disponível</div>
              )}
            </div>
          </div>
        </div>
        <div className="pl-12 py-10">
          <Information
            telefones={barberShop.telefones}
            onTelefoneDeletado={atualizarSplintBarbershop}
          />
        </div>
      </div>
    </>
  );
};

export default SplintBarbershop;
