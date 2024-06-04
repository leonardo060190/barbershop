import Header from "@/components/header/header";
import ServiceItem from "./components/serviceItem";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon, StarIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import Telefone from "./components/Telefone";
import Information from "../barbershops/components/information";

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
  numAvaliacoes: number;
  descricao: string;
  servicos: Service[];
  endereco?: Endereco;
  telefones: Telefone[];
}

const BarberShopDetailsPage = () => {
  const { id } = useParams();
  const [barberShop, setBarberShop] = useState<BarberShop | null>(null);

  useEffect(() => {
    const obterBarbearia = async () => {
      try {
        const response = await api.get(`/barbearias/${id}`);
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

  if (!barberShop) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header />
      <div className="px-12 max-w-[80rem] min-w-[32rem] flex flex-col md:flex-row">
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
              <div className="px-5 pt-6">
                <h1 className="text-xl font-bold">{barberShop.nome}</h1>

                <div className="flex gap-1 mt-3">
                  <MapPinIcon className="text-primary" size={18} />
                  <p className="text-sm">
                    {barberShop.endereco?.bairro || "Endereço indisponivel"}{" "}
                    {barberShop.endereco?.rua} {barberShop.endereco?.numero}
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
            <div className=" grid gap-5  grid-cols-1  xl:grid-cols-2">
              {barberShop.servicos?.length > 0 ? (
                barberShop.servicos.map((servico) => (
                  <ServiceItem
                    key={servico.id} // Use um identificador único se disponível
                    id={servico.id}
                    nome={servico.nome}
                    foto={servico.foto}
                    descricao={servico.descricao}
                    preco={servico.preco}
                    barbeariaId={servico.barbeariaId}
                    nomeBarbershop={barberShop.nome}
                  />
                ))
              ) : (
                <div>Nenhum serviço disponível</div>
              )}
            </div>
          </div>
        </div>
        <div className="pl-12 py-10">
          <Information telefones={barberShop.telefones}/>
        </div>
      </div>
    </div>
  );
};

export default BarberShopDetailsPage;
