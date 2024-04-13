import HoraFormat from "@/components/horaFormat/HoraFormat";
import Header from "../../components/header/header";
import Search from "@/components/layout/search";
import Footer from "@/components/footer/footer";
import BarbershopItem from "@/components/barbershopItem/barbershopItem";
const home = () => {
  return (
    <div>
      <Header />

      <div className="px-12 py-12 justify-between flex flex-col md:flex-row">
        <div className="flex gap-20 items-center  justify-between flex-col md:flex-row">
          <div className="w-80 justify-center">
            <h2 className="text-xl">
              Olá, <span className="font-bold">Faça seu Login</span> !
            </h2>

            {/* exibe o horario atual*/}
            <HoraFormat />

            <div className=" mt-6">
              <Search />
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
      <div className=" mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default home;
