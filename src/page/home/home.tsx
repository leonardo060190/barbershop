import HoraFormat from "@/components/horaFormat/HoraFormat";
import Header from "../../components/header/header";
import Search from "../search/components/search";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BarbershopItemRecomendados from "./components/barbershopItem/barbershopItemRecomendados";
import BarbershopItemPopulares from "./components/barbershopItem/barbershopItemPopulares";
import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import { useAuth } from "@/components/authProvider/AuthProvider";
import { Link } from "react-router-dom";
import MenuSettings from "./components/menuSettings/MenuSettings";
import _ from "lodash";

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

const Home = () => {
  const { autenticado, user } = useAuth();
  // const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [recommendedBarbershops, setRecommendedBarbershops] = useState<
    Barbershop[]
  >([]);
  const [popularBarbershops, setPopularBarbershops] = useState<Barbershop[]>(
    []
  );
  const [barbershopReload, setBarbershopReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const obterLista = async () => {
    try {
      const response = await api.get("/barbearia");
      const lista = response.data;
      console.log("lista:", lista);
      if (Array.isArray(lista)) {
        const shuffledList = _.shuffle(lista);
        // setBarbershops(shuffledList);
        setRecommendedBarbershops(_.shuffle(shuffledList));
        setPopularBarbershops(_.shuffle(shuffledList));
      } else {
        console.error("Dados de barbearia não são um array:", lista);
        alert("Erro: Os dados retornados não são uma lista válida.");
      }
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obterLista();
    if (barbershopReload) {
      obterLista(); // Fetch updated data and re-render
      setBarbershopReload(false); // Reset the reload flag
    }
  }, [barbershopReload]);

  const userName = user?.nome || user?.cliente?.nome || null;
  const userid = user?.cliente?.id || null;

  return (
    <div>
      <Header />
      <div className="py-2 flex bg-dark px-4 font-bold items-center justify-center shadow-lg">
        {autenticado && userid && <MenuSettings idCliente={userid} />}
      </div>
      <div className="justify-between flex flex-col md:flex-row">
        <div className="ps-12 py-12 flex gap-20 items-center  justify-between flex-col md:flex-row">
          <div className="w-80 justify-center">
            <h2 className="text-xl">
              {autenticado && userName ? (
                <>
                  <span>
                    Olá,{" "}
                    <span className="me-3 capitalize font-bold">
                      {userName}
                    </span>
                  </span>
                </>
              ) : (
                <span>
                  Olá, <span className="font-bold">Faça seu Login</span>!
                </span>
              )}
            </h2>

            {/* exibe o horario atual*/}
            <HoraFormat />

            <div className=" mt-6">
              <Search />
            </div>
            <Link
              className="h-10 mt-4 text-xl hover:text-primary hover:bg-[rgba(24,24,25,0.84)] flex items-center justify-center border rounded-md border-solid border-secondary px-3"
              to={"/allbarbershopsdetails"}
            >
              Todas as Barbearias
            </Link>
          </div>
        </div>
        {/* Recomendados */}
        <div className="px-12 py-12">
          <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
            Recomendados
          </h2>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <span>Carregando...</span>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
              }}
              className="max-w-[54rem]"
            >
              <CarouselContent className="flex">
                {recommendedBarbershops.slice(0, 5).map((barbershop, index) => (
                  <CarouselItem
                    key={index}
                    style={{ width: "180px" }}
                    className="basis-48"
                  >
                    <BarbershopItemRecomendados
                      id={barbershop.id}
                      foto={barbershop.foto}
                      nome={barbershop.nome}
                      rua={barbershop.endereco?.rua}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </div>

      {/* populares */}
      <div className="px-12  mb-[4.5rem]">
        <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <span>Carregando...</span>
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full	"
          >
            <CarouselContent>
              {popularBarbershops.slice(0, 10).map((barbershop, index) => (
                <CarouselItem
                  key={index}
                  style={{ width: "180px" }}
                  className="basis-48"
                >
                  <BarbershopItemPopulares
                    id={barbershop.id}
                    foto={barbershop.foto}
                    nome={barbershop.nome}
                    rua={barbershop.endereco?.rua}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Home;
