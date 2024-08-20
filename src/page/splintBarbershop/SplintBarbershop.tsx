import Header from "@/components/header/header";
// import EditServices from "./components/renderForms/EditServices";
// import RegisterServices from "./components/renderForms/RegisterServices";
import Information from "./components/informacoes/information";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import { useParams } from "react-router-dom";
import RegisterProfissional from "./components/profissional/components/RegisterProfissional";
import CardProfissionais from "./components/profissional/components/CardProfissionais";
// import MenuSettingsBarbershop from "./components/menuSettingsBarbershop/MenuSettingsBarbershop";

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
interface Profissional {
  id: string;
  nome: string;
  sobreNome: string;
  foto: string;
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
  const [profissional, setProfissional] = useState<Profissional[]>([]);

  const obterBarbearia = useCallback(async () => {
    try {
      const response = await api.get(`/barbearia/${id}`);
      setBarberShop(response.data);
      console.log(response.data);
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados: ${error}`);
    }
  }, [id]);

  const obterProfissionais = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await api.get(`/profissional/barbearia/${id}`);
      setProfissional(response.data);
      console.log("profissional", response.data);
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    } finally {
      // setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      obterBarbearia();
      obterProfissionais();
    }
  }, [id, obterBarbearia, obterProfissionais]);

  const atualizarSplintBarbershop = async () => {
    try {
      const response = await api.get(`/barbearia/${id}`);
      setBarberShop(response.data);
    } catch (error) {
      console.error("Erro ao atualizar os serviços:", error);
    }
  };

  if (!barberShop) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* <div className=" py-2 flex bg-dark px-4 font-bold items-center justify-center shadow-lg">
        <MenuSettingsBarbershop onUpdate={obterBarbearia} />
      </div> */}
      <div className="px-12 flex flex-col md:flex-row">
        <div>
          <div className="pb-6">
            <div className=" pt-10 ">
              <img
                src={barberShop.foto}
                alt={barberShop.nome}
                className="object-cover  w-full h-full  rounded-2xl "
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
              <h1 className="text-xl font-bold ">Profissionais Cadastrados</h1>
              <div className="flex justify-end">
                {id && (
                  <RegisterProfissional
                    idBarbershop={id}
                    onProfissionalCadastrado={atualizarSplintBarbershop}
                  />
                )}
              </div>
            </div>
            <div className=" grid gap-5  grid-cols-1  xl:grid-cols-2">
              {profissional.length > 0 ? (
                profissional.map((profissionais) => (
                  <CardProfissionais
                    key={profissionais.id} // Use um identificador único se disponível
                    id={profissionais.id}
                    barbeariaId={id || ""}
                    nome={profissionais.nome}
                    foto={profissionais.foto}
                    sobreNome={profissionais.sobreNome}
                  />
                ))
              ) : (
                <div>Não há profissional cadastrado</div>
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
