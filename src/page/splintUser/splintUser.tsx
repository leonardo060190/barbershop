import HoraFormat from "@/components/horaFormat/HoraFormat";
import HeaderUser from "../../components/header/headerUser";
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
import { Search } from "lucide-react";
import CarouselMaisVisitados from "@/components/carousel/CarouselMaisVisitados";
import CarouselPopular from "@/components/carousel/CarouselPopular";
import Footer from "@/components/footer/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const splintUser = () => {
  return (
    <div>
      <HeaderUser />

      <div className="px-12 py-12 justify-between flex flex-col md:flex-row">
        <div>
          <CardHeader>
            <CardTitle className="text-xll">
              Olá, <span className="font-bold">Leonardo Domingos</span> !
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

          <Card>
            <CardHeader>
              <span>confirmado</span>
              <CardTitle>
                <h5>Corte de cabelo</h5>
              </CardTitle>
              <CardContent>
              <div className="flex flex-row">
                <Avatar className="me-3">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="LD"
                    width={30}
                    className="rounded-full"
                  />
                  <AvatarFallback>LD</AvatarFallback>
                  Leonardo Domingos
                </Avatar>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
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
