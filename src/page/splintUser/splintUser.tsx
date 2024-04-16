import HoraFormat from "@/components/horaFormat/HoraFormat";
import HeaderUser from "../../components/header/headerUser";

import Search from "@/components/layout/search";
import BookingItem from "@/components/bookingItem/bookingItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BarbershopItemRecomendados from "@/components/barbershopItem/barbershopItemRecomendados";
import BarbershopItemPopulares from "@/components/barbershopItem/barbershopItemPopulares";

const splintUser = () => {
  return (
    <div>
      <HeaderUser />

      <div className=" justify-between flex flex-col md:flex-row">
        <div className="ps-12  py-12 flex items-center justify-between flex-col md:flex-row">
          <div className="w-80 justify-center">
            <h2 className="text-xll">
              Olá,<span className="font-bold">Leonardo Domingos</span> !
            </h2>

            {/* exibe o horario atual*/}
            <HoraFormat />

            <div className=" mt-6">
              <Search />
            </div>

            <div className="mt-6 pb-4">
              <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
                Agendamentos
              </h2>
              <BookingItem />
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
                  <BarbershopItemRecomendados />

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
      <div className="px-12 mb-[4.5rem]">
        <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-full"
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                style={{ width: "180px" }}
                className="basis-50"
              >
                {/* {barbershop.map((barbershop) => ( */}
                <BarbershopItemPopulares />

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

export default splintUser;
