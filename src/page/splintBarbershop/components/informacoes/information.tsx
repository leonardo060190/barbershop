import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Telefone from "../telefone/Telefone";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { useAuth } from "../../../../components/authProvider/AuthProvider";
import { api } from "../../../../../config/ConfigAxios";
import { Separator } from "../../../../components/ui/separator";
import RenderHorarioFuncionamento from "../cadastroHorarioFuncionamento/RenderHorarioFuncionamento";

interface Endereco {
  rua: string;
  bairro: string;
  numero: string;
}

interface Barbearia {
  id: string;
  nome: string;
  foto: string;
  endereco?: Endereco;
}

interface DiaSemana {
  id: string;
  nome: string;
}

interface HorarioFuncionamento {
  id: string;
  abri: string;
  fecha: string;
  diaSemana?: DiaSemana;
}

interface InformationTelefoneProps {
  telefones: { id: string; numero: string }[];
  onTelefoneDeletado: () => void;
  showDeleteButton: boolean;
}

const Information: React.FC<InformationTelefoneProps> = ({
  telefones,
  onTelefoneDeletado,
  showDeleteButton,
}) => {
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null);
  const [horarioFuncionamento, setHorarioFuncionamento] = useState<
    HorarioFuncionamento[]
  >([]);

  const { user } = useAuth();
  const barbeariaId = user?.barbearia?.id || null;

  useEffect(() => {
    const fetchBarbearia = async () => {
      try {
        const response = await api.get(`/barbearia/${barbeariaId}`);
        setBarbearia(response.data);
        console.log("fetchBarbearia", response.data);
      } catch (error) {
        console.error("Erro ao buscar os telefones:", error);
      }
    };

    const fetchHorarioFuncionamento = async () => {
      try {
        const response = await api.get(
          `/horarioFuncionamento/barbearia/${barbeariaId}`
        );
        setHorarioFuncionamento(response.data);
        console.log("fetchHorarioFuncionamento", response.data);
      } catch (error) {
        console.error("Erro ao buscar os telefones:", error);
      }
    };
    if (barbeariaId) {
      fetchHorarioFuncionamento();
      fetchBarbearia();
    }
  }, [barbeariaId]);

  return (
    <div>
      <Card className="px-3 py-3 max-w-[24rem] min-w-[18rem] break-all">
        <div className="px-4">
          <div className="relative h-[180] w-11/12 mt-4">
            <img src="/BarberShopCard.png" alt={"barbearia?.nome"} />
            <div className="w-full absolute bottom-4 left-0 px-6">
              <Card>
                <CardContent className="p-3 flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={barbearia?.foto}
                      alt={barbearia?.nome.charAt(0) || ""}
                      width={40}
                      className="rounded-full"
                    />
                    <AvatarFallback>{barbearia?.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{barbearia?.nome}</h2>
                    {barbearia?.endereco ? (
                      <h3 className="Text-xs overflow-hidden text-nowrap text-ellipsis">{`${barbearia?.endereco.rua}, ${barbearia?.endereco.bairro} -  ${barbearia?.endereco.numero}`}</h3>
                    ) : (
                      <h3>Endereço não disponível</h3>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <CardHeader>
            Sobre nós
            <CardDescription className="py-3 break-all border-b border-solid border-secondary">
              <p>informações...</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-5 pt-0 flex flex-col gap-4  border-b border-solid border-secondary">
              {telefones.length > 0 ? (
                telefones.map((telefone) => (
                  <Telefone
                    key={telefone.id}
                    id={telefone.id}
                    numero={telefone.numero}
                    onTelefoneDeletado={onTelefoneDeletado}
                    showDeleteButton={showDeleteButton}
                  />
                ))
              ) : (
                <div>Nenhum telefone disponível</div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex justify-between ">
                <h2 className="font-bold">Horario de funcionamento</h2>
              </div>
              <RenderHorarioFuncionamento />
              <Separator />
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-bold">
                      Dia Semana
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-bold">
                      Abre
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-bold">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {horarioFuncionamento.length > 0 ? (
                    horarioFuncionamento.map((horario) => (
                      <tr key={horario.id} className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-400">
                          {horario.diaSemana?.nome}
                        </td>
                        <td className="px-4 py-2 text-sm">{horario.abri}</td>
                        <td className="px-4 py-2 text-sm">{horario.fecha}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-center text-sm">
                        Fechado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Information;
