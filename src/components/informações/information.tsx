import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Telefone from "../../page/splintBarbershop/components/telefone/Telefone";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "../authProvider/AuthProvider";
import { api } from "../../../config/ConfigAxios";
import { Separator } from "../ui/separator";

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
  inicio: string;
  fim: string;
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
                <h3 className="font-bold text-sm">dia</h3>
              </div>
              <Separator />
              <div className="flex justify-between ">
                <h3 className="font-bold text-sm">dia Semana</h3>
                <h3 className="font-bold text-sm">Inicio</h3>
                <h3 className="font-bold text-sm">Fim</h3>
              </div>
              <Separator />
              {horarioFuncionamento.length > 0 ? (
                horarioFuncionamento.map((horario) => (
                  <React.Fragment key={horario.id}>
                    <div className="flex justify-between">
                      <h3 className="text-gray-400 text-sm">
                        {horario.diaSemana?.nome}
                      </h3>
                      <h4 className="text-sm">{horario.inicio}</h4>
                      <h4 className="text-sm">{horario.fim}</h4>
                    </div>
                    <Separator />
                  </React.Fragment>
                ))
              ) : (
                <div>Nenhum horário de funcionamento disponível</div>
              )}

            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Information;
