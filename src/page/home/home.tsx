import HoraFormat from "@/components/horaFormat/HoraFormat";
import Header from "../../components/header/header";
import Search from "@/components/layout/search";
import BarbershopItem from "@/components/barbershopItem/barbershopItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const home = () => {
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
              {Array.from({ length: 7 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  style={{ width: "180px" }}
                  className="basis-48"
                >
                  {/* {barbershop.map((barbershop) => ( */}
                  <BarbershopItem />

                  {/* ))} */}
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
            {Array.from({ length: 7 }).map((_, index) => (
              <CarouselItem key={index} className="basis-48">
                {/* {barbershop.map((barbershop) => ( */}
                <BarbershopItem />

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

export default home;
