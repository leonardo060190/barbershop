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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

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
        const sortedHorarios = response.data.sort(
          (a: HorarioFuncionamento, b: HorarioFuncionamento) => {
            const idA = a.diaSemana?.id?.toString() || "";
            const idB = b.diaSemana?.id?.toString() || "";
            return idA.localeCompare(idB);
          }
        );
        setHorarioFuncionamento(sortedHorarios);
        console.log("fetchHorarioFuncionamento", sortedHorarios);
      } catch (error) {
        console.error("Erro ao buscar os horários de funcionamento:", error);
      }
    };

    if (barbeariaId) {
      fetchHorarioFuncionamento();
      fetchBarbearia();
    }
  }, [barbeariaId]);

  const removeHorario = async (id: string) => {
    if (!window.confirm(`Confirma a exclusão do horario ?`)) {
      return;
    }
    try {
      await api.delete(`/horarioFuncionamento/${id}`);
      setHorarioFuncionamento(
        horarioFuncionamento.filter(
          (horarioFuncionamento) => horarioFuncionamento.id !== id
        )
      );
      toast.success("Horario deletado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro ao deletar o horario funcionamento:", error);
    }
  };

  return (
    <div>
      <Card className="px-3 py-3 max-w-[25rem] min-w-[20rem] break-all">
        <div>
          <div className="relative h-[180]">
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
                      <div className="text-xs">
                        <h3 className="overflow-hidden whitespace-nowrap text-ellipsis">{`${barbearia?.endereco.rua} -  ${barbearia?.endereco.numero}`}</h3>
                        <h3 className="overflow-hidden whitespace-nowrap text-ellipsis">{barbearia?.endereco.bairro}</h3>
                      </div>
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
                    <th className="px-2 py-2 text-left text-sm font-bold">
                      Dia Semana
                    </th>
                    <th className="px-2 py-2 text-left text-sm font-bold">
                      Abre
                    </th>
                    <th className="px-2 py-2 text-left text-sm font-bold">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {horarioFuncionamento.map((horario) => (
                    <tr key={horario.id} className="border-b">
                      <td className="px-2 py-1 text-sm text-gray-400">
                        {horario.diaSemana?.nome}
                      </td>
                      <td className="px-2 py-2 text-sm">{horario.abri}</td>
                      <td className="px-2 py-2 text-sm">{horario.fecha}</td>
                      <td>
                        <Button
                          variant="transparent"
                          className="text-[#ff6666] gap-2  ml-auto"
                          onClick={() => removeHorario(horario.id)}
                        >
                          <X size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
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
