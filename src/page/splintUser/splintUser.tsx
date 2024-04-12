import HoraFormat from "@/components/horaFormat/HoraFormat";
import HeaderUser from "../../components/header/headerUser";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";

import CarouselMaisVisitados from "@/components/carousel/CarouselMaisVisitados";
import CarouselPopular from "@/components/carousel/CarouselPopular";
import Footer from "@/components/footer/footer";
import Search from "@/page/home/_ComponentsHome/search";
import BookingItem from "@/components/bookingItem/bookingItem";
const splintUser = () => {
  return (
    <div>
      <HeaderUser />

      <div className="px-12 py-12 justify-between flex flex-col md:flex-row">
        <div>
          <h2 className="text-xll">
            Olá,<span className="font-bold">Leonardo Domingos</span> !
          </h2>

          {/* exibe o horario atual*/}
          <HoraFormat />

          <div className=" mt-6">
            <Search />
          </div>

          <div className="mt-6">
            <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
            <BookingItem />
          </div>
        </div>

        {/* carocel de recomendados */}
        <div className="px-*">
          <h3 className="pb-2">Recomendados</h3>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-4xl"
          >
            <CarouselContent className="flex">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
                  <div className="justify-end flex-auto">
                    <Card>
                      <CardContent className="text-center">
                        <p>olá</p>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <Button>Agendar</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* carocel de populares */}
      <CarouselPopular />

      {/* carocel de mais visitados */}
      <CarouselMaisVisitados />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default splintUser;
