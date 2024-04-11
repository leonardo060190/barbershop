import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const CarouselMaisVisitados = () => {
  return (
    <div className=" px-12 pb-12 justify-between item-center">
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
  );
};

export default CarouselMaisVisitados;
