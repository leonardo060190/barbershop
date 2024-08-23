import Header from "@/components/header/header";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon, StarIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import Telefone from "../splintBarbershop/components/telefone/Telefone";
import InformationBarbershop from "../home/components/informationBarbershop/InformationBarbershop";
import CardProfissionaLBarbershop from "./components/CardProfissionalBarbershp";

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
  id: string;
  nome: string;
  foto: string;
  avaliacao: number;
  numAvaliacoes: number;
  descricao: string;
  servicos: Service[];
  endereco: Endereco;
  telefones: Telefone[];
}

const BarberShopDetailsPage = () => {
  const { id } = useParams();
  const [barberShop, setBarberShop] = useState<BarberShop | null>(null);
  const [profissional, setProfissional] = useState<Profissional[]>([]);

  console.log("barberShop", barberShop, profissional);

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

  if (!barberShop) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="px-12  flex flex-col md:flex-row">
        <div>
          <div className="pb-6">
            <div className=" pt-10 ">
              <img
                src={barberShop.foto}
                alt={barberShop.nome}
                className="object-cover rounded-2xl w-full h-full "
              />
            </div>
            <div className="flex justify-between pb-6 border-b border-solid border-secondary">
              <div className="px-5 pt-6">
                <h1 className="text-xl font-bold">{barberShop.nome}</h1>

                <div className="flex gap-1 mt-3">
                  <MapPinIcon className="text-primary" size={18} />
                  <p className="text-sm ">
                    {barberShop.endereco?.bairro || "Endereço indisponivel"}
                    {", "}
                    {barberShop.endereco?.rua} {"-  "}
                    {barberShop.endereco?.numero}
                  </p>
                </div>
              </div>
              <div className="mt-5">
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
              </div>
            </div>
          </div>
          <div className=" pb-6 flex-wrap justify-center">
            <div className="grid py-6 gap-2 grid-cols-2 ">
              <h1 className="text-xl font-bold ">Profissionais Cadastrados</h1>
            </div>
          </div>
          <div className=" pb-6 flex-wrap justify-center">
            <div className=" grid gap-5  grid-cols-1  xl:grid-cols-2">
              {profissional.length > 0 ? (
                profissional.map((profissionais) => (
                  <CardProfissionaLBarbershop
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
          <InformationBarbershop
            barbeariaId={barberShop.id}
            telefones={barberShop.telefones}
            endereco={barberShop.endereco}
          />
        </div>
      </div>
    </div>
  );
};

export default BarberShopDetailsPage;
