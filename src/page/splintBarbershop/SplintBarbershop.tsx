import Header from "@/components/header/header";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import EditServices from "./components/EditServices";

const SplintBarbershop = () => {
  return (
    <>
      <Header />
      <div className="px-12 max-w-[100rem] min-w-[32rem] flex flex-col md:flex-row">
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
              <div className=" pt-6">
                <h1 className="text-xl font-bold">BarberShop</h1>
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
            <h1 className="text-xl font-bold py-6">Registered services</h1>
            <div className=" grid gap-5  grid-cols-1  xl:grid-cols-2">
              <EditServices />
              <EditServices />
              <EditServices />
              <EditServices />
              <EditServices />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplintBarbershop;
