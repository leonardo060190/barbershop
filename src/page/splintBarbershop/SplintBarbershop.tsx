import Header from "@/components/header/header";
import EditServices from "./components/renderForms/EditServices";
import RegisterServices from "./components/renderForms/RegisterServices";
import Information from "./components/informacoes/information";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import { useParams } from "react-router-dom";
import MenuSettingsBarbershop from "./components/menuSettingsBarbershop/MenuSettingsBarbershop";

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

  const obterBarbearia = useCallback(async () => {
    try {
      const response = await api.get(`/barbearia/${id}`);
      setBarberShop(response.data);
      console.log(response.data);
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados: ${error}`);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      obterBarbearia();
    }
  }, [id, obterBarbearia]);

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
      <div className=" py-2 flex bg-dark px-4 font-bold items-center justify-center shadow-lg">
        <MenuSettingsBarbershop onUpdate={obterBarbearia} />
      </div>
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
              </div>
            </div>
          </div>

          <div className=" pb-6 flex-wrap justify-center">
            <div className="grid py-6 gap-2 grid-cols-2 ">
              <h1 className="text-xl font-bold ">Serviços Regitrados</h1>
              <div className="flex justify-end">
                {id && (
                  <RegisterServices
                    idBarbershop={id}
                    onServicoRegistrado={atualizarSplintBarbershop}
                  />
                )}
              </div>
            </div>
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
        <div className="pl-12 py-10 flex justify-center">
          <Information
            telefones={barberShop.telefones}
            onTelefoneDeletado={atualizarSplintBarbershop}
            showDeleteButton={true}
          />
        </div>
      </div>
    </>
  );
};

export default SplintBarbershop;
