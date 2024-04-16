import Header from "@/components/header/header";
import ServiceItem from "./components/serviceItem";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon, StarIcon } from "lucide-react";

const barberShopDetailsPage = () => {
  return (
    <div>
      <Header />
      <div className="px-12 pb-6">
        <div className=" pt-10 w-758 h-485.9 relative">
          <img
            src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
            alt="barbershop"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between pb-6 border-b border-solid border-secondary">
          <div className="px-5 pt-3">
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
                  <StarIcon size={18} className="fill-primary text-primary" />
                  <p>5.0</p>
                </div>
                (899 avaliações)
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="px-12 pb-6 flex justify-between">
        <div className="px5 gap-4 flex w-96 flex-col">
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
  );
};

export default barberShopDetailsPage;
