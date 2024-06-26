import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../config/ConfigAxios";
import AllBarbershops from "../allBarbershops/components/AllBarbershops";
import Header from "@/components/header/header";

interface Endereco {
  bairro: string;
  cep: string;
  rua: string;
  numero: string;
}
interface Barbershop {
  id: string;
  foto: string;
  nome: string;
  endereco?: Endereco;
}

const SearchResults = () => {
  const { nome } = useParams<{ nome: string }>();
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);

  useEffect(() => {
    const fetchBarbershops = async () => {
      try {
        const response = await api.get(`/barbearia/search/${nome}`);
        const data = response.data;
        console.log(data);

        setBarbershops(data);
      } catch (error) {
        alert(`Erro: Não foi possível obter os dados`);
      }
    };
    fetchBarbershops();
  }, [nome]);

  return (
    <>
      <Header />

      <div className="px-12 py-12">
        <h2 className="text-xl mb-6">
          <span className="py-1 flex bg-secondary rounded-md px-4 font-bold items-center justify-center border-solid border-secondary  text-primary border">
            Resultados da Pesquisa:
          </span>
        </h2>
        {barbershops.length > 0 ? (
          barbershops.map((barbershop) => (
            <AllBarbershops
              key={barbershop.id}
              id={barbershop.id}
              foto={barbershop.foto}
              nome={barbershop.nome}
              rua={barbershop.endereco?.rua}
            />
          ))
        ) : (
          <p>Nenhuma barbearia encontrada.</p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
