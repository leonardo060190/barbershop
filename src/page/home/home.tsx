import HoraFormat from "@/components/horaFormat/HoraFormat";
import Header from "../../components/header/header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search} from "lucide-react";
import CarouselMaisVisitados from "@/components/carousel/CarouselMaisVisitados";
import CarouselPopular from "@/components/carousel/CarouselPopular";
import Footer from "@/components/footer/footer";
const home = () => {
  return (
    <div>
      <Header />

      <div className="px-12 py-12 justify-between flex flex-col md:flex-row">
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

export default home;
