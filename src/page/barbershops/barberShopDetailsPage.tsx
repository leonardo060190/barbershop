import Header from "@/components/header/header";
import ServiceItem from "./components/ServiceItem";
import Information from "./components/information";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon, StarIcon } from "lucide-react";

const barberShopDetailsPage = () => {
  return (
    <div>
      <Header />
      <div className="px-12 flex flex-col md:flex-row">
        <div>
          <div className="pb-6">
            <div className=" pt-10 ">
              <img
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="barbershop"
                className="object-cover rounded-2xl"
                width={958}
                height={687}
              />
            </div>
            <div className="flex justify-between pb-6 border-b border-solid border-secondary">
              <div className="px-5 pt-6">
                <h1 className="text-xl font-bold">BarberShop</h1>

                <div className="flex gap-1 mt-3">
                  <MapPinIcon className="text-primary" size={18} />
                  <p className="text-sm">Endereço</p>
                </div>
              </div>
              <div className="mt-5">
                <Card>
                  <CardContent className="px-4 py-3">
                    <div className="flex gap-2 px-6 items-center">
                      <StarIcon
                        size={18}
                        className="fill-primary text-primary"
                      />
                      <p>5.0</p>
                    </div>
                    (899 avaliações)
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        
        <div className=" pb-6 flex-wrap justify-center">
          <div className=" grid gap-5  grid-cols-1  xl:grid-cols-2">
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
          </div>
        </div>
        </div>
        <div className="pl-12 py-10 flex w-auto">
          <Information />
        </div>
      </div>
    </div>
  );
};

export default barberShopDetailsPage;
