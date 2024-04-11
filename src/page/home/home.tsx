import HoraFormat from "@/components/horaFormat/HoraFormat";
import Header from "../../components/header/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const home = () => {
  return (
    <div>
      <Header />

      <div className="px-16 py-12 content-between flex flex-col md:flex-row">
        <div className="border-2 ring-1 rounded-md">
          <CardHeader>
            <CardTitle className="text-xl">
              Olá, <span className="font-bold">Faça seu Login</span>!
            </CardTitle>
            {/* exibe o horario atual*/}
            <HoraFormat />
            <div className="py-8 flex w-full max-w-sm items-center space-x-2 ">
              <Input
                className="outline-0"
                type="text"
                placeholder="Buscar Barbearias"
              />
              <Button type="submit">
                <Search />
              </Button>
            </div>
          </CardHeader>
        </div>
        {/* carocel de recomendados */}
        <div className="px-16">
          <h3 className="pb-2">Recomendados</h3>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="flex">
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-full"
                >
                  <div>
                    <Card>
                      <CardContent className="flex aspect-square"></CardContent>
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
      <div className=" px-16 py-12 justify-between item-center">
        <h3 className="pb-2">Populares</h3>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                <div>
                  <Card>
                    <CardContent>
                      <Button>Agendar</Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* carocel de mais visitados */}
      <div className=" px-16 pb-12 justify-between item-center">
        <h3 className="pb-2">Mais Visitados</h3>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                <div>
                  <Card>
                    <CardContent className="flex">
                    <Button>Agendar</Button>
                    </CardContent>
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
  );
};

export default home;
