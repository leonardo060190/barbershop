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

const home = () => {
  return (
    <div>
      <Header />

      <div className="px-10 py-16 justify-between item-center flex flex-col md:flex-row">
        <div>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Olá, Leonardo</CardTitle>

            <HoraFormat />
          </CardHeader>
        </div>

        <div >
          <h3 className="pb-2">Recomendados</h3>
          <Carousel
          
            
          >
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card>
                      <CardContent className="flex aspect-square "></CardContent>
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
    </div>
  );
};

export default home;
