import HoraFormat from "@/components/horaFormat/HoraFormat";
import HeaderUser from "../../components/header/headerUser";

import Footer from "@/components/footer/footer";
import Search from "@/components/layout/search";
import BookingItem from "@/components/bookingItem/bookingItem";
import BarbershopItem from "@/components/barbershopItem/barbershopItem";
const splintUser = () => {
  return (
    <div>
      <HeaderUser />

      <div className="px-12 py-12 justify-between flex flex-col md:flex-row">
        <div className="flex gap-20 items-center  justify-between flex-col md:flex-row">
          <div className="w-80 justify-center">
            <h2 className="text-xll">
              Olá,<span className="font-bold">Leonardo Domingos</span> !
            </h2>

            {/* exibe o horario atual*/}
            <HoraFormat />

            <div className=" mt-6">
              <Search />
            </div>

            <div className="mt-6">
              <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
                Agendamentos
              </h2>
              <BookingItem />
            </div>
          </div>

          <div>
            <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
              Recomendados
            </h2>

            <div className="flex gap-4 ">
              {/* {barbershop.map((barbershop) => ( */}
              <BarbershopItem />
              <BarbershopItem />
              <BarbershopItem />
              <BarbershopItem />
              <BarbershopItem />

              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className=" mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default splintUser;
