import HoraFormat from "@/components/horaFormat/HoraFormat";
import Header from "../../components/header/header";
import Search from "@/components/layout/search/search";

import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import { useAuth } from "@/components/authProvider/AuthProvider";
import AllBarbershops from "./components/AllBarbershops";
import { Button } from "@/components/ui/button";

interface Endereco {
  bairro: string;
  cep: string;
  rua: string;
  numero: string;
}
interface Barbershop {
  id: string;
  foto: string;
  nome: string;
  endereco?: Endereco;
}

const AllBarbershopsDetails = () => {
  const { autenticado, user } = useAuth();
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [barbershopReload, setBarbershopReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const obterLista = async (page: number) => {
    try {
      const response = await api.get("/barbearia", {
        params: {
          page: page - 1,
          size: itemsPerPage,
        },
      });

      const {  totalPages } = response.data;
      setBarbershops(response.data);
      setTotalPages(totalPages);
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  };

  useEffect(() => {
    obterLista(currentPage);
    if (barbershopReload) {
      obterLista(currentPage); // Fetch updated data and re-render
      setBarbershopReload(false); // Reset the reload flag
    }
  }, [currentPage, barbershopReload]);

  const userName = user?.nome || user?.cliente?.nome || null;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Header />

      <div>
        <div className="ps-12 py-12 flex gap-20 items-center  justify-between flex-col md:flex-row">
          <div className="w-80 justify-center">
            <h2 className="text-xl">
              {autenticado && userName ? (
                <span>
                  Olá,{" "}
                  <span className="me-3 capitalize font-bold">{userName}</span>
                </span>
              ) : (
                <span>
                  Olá, <span className="font-bold">Faça seu Login</span>!
                </span>
              )}
            </h2>

            {/* exibe o horario atual*/}
            <HoraFormat />

            <div className=" mt-6">
              <Search />
            </div>
          </div>
        </div>

        <div className="px-12 py-12">
          <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
            Todas as Barbearias
          </h2>
          <div className="flex gap-4 justify-between flex-wrap">
            {/* {barbershops.map((barbershop) => (
              <AllBarbershops
                key={barbershop.id}
                id={barbershop.id}
                foto={barbershop.foto}
                nome={barbershop.nome}
                rua={barbershop.endereco?.rua}
              />
            ))} */}
             {Array.isArray(barbershops) && barbershops.length > 0 ? (
              barbershops.map((barbershop) => (
                <AllBarbershops
                  key={barbershop.id} // Adicionando a key aqui
                  id={barbershop.id}
                  foto={barbershop.foto}
                  nome={barbershop.nome}
                  rua={barbershop.endereco?.rua}
                />
              ))
            ) : (
              <p>Nenhuma barbearia encontrada.</p>
            )}
          </div>
          <div className="flex justify-between mt-6">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </Button>
            <span>
              Página {currentPage}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBarbershopsDetails;
