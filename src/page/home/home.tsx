import HoraFormat from "@/components/horaFormat/HoraFormat";
import Header from "../../components/header/header";
import Search from "@/components/layout/search/search";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BarbershopItemRecomendados from "@/components/barbershopItem/barbershopItemRecomendados";
import BarbershopItemPopulares from "@/components/barbershopItem/barbershopItemPopulares";
import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";

interface Endereco {
  bairro:string;
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
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [produtosReload, setProdutosReload] = useState(false);

  const obterLista = async () => {
    try {
      const lista = await api.get("/barbearias");
      console.log("lista:" + lista.data);
      setBarbershops(lista.data);
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  };

  useEffect(() => {
    obterLista();
    if (produtosReload) {
      obterLista(); // Fetch updated data and re-render
      setProdutosReload(false); // Reset the reload flag
    }
  }, [produtosReload]);

  return (
    <div>
      <Header />

      <div className="justify-between flex flex-col md:flex-row">
        <div className="ps-12 py-12 flex gap-20 items-center  justify-between flex-col md:flex-row">
          <div className="w-80 justify-center">
            <h2 className="text-xl">
              Olá, <span className="font-bold">Faça seu Login</span> !
            </h2>

            {/* exibe o horario atual*/}
            <HoraFormat />

            <div className=" mt-6">
              <Search />
            </div>
          </div>
        </div>
        {/* Recomendados */}
        <div className="px-12 py-12">
          <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
            Recomendados
          </h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="max-w-[54rem]"
          >
            <CarouselContent className="flex">
              {barbershops.slice(0, 5).map((barbershop, index) => (
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
        </div>
      </div>

      {/* populares */}
      <div className="px-12  mb-[4.5rem]">
        <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-full	"
        >
          <CarouselContent>
          {barbershops.slice(0, 10).map((barbershop, index) => (
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

                {/* ))} */}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
