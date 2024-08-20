import Header from "@/components/header/header";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "../../../../../config/ConfigAxios";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import TelefoneProfissional from "./components/TelefoneProfissional";
import SelectServicos from "./components/SelectServicos";
import ServicosProfissional from "./components/ServicosProfissional";

interface Profissional {
  id: string;
  nome: string;
  sobreNome: string;
  foto: string;
  barbeariaId: string;
}

interface Telefone {
  id: string;
  numero: string;
}

const ProfissionalDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [telefones, setTelefones] = useState<Telefone[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const obterProfissionais = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await api.get(`/profissional/${id}`);
      setProfissional(response.data);
      console.log("profissional", response.data);
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const obterTelefones = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await api.get(`/telefone/profissional/${id}`);
      setTelefones(response.data);
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      obterProfissionais();
      obterTelefones();
    }
  }, [id, obterProfissionais, obterTelefones]);

  const removeTelefone = async (id: string, numero: string) => {
    if (!window.confirm(`Confirma a exclusão do Telefone ${numero} ?`)) {
      return;
    }
    try {
      await api.delete(`/telefone/${id}`);
      setTelefones(telefones.filter((telefone) => telefone.id !== id));
      toast.success("Telefone Deletado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      toast.error(`Erro ao deletar o Telefone: ${error}`, {
        style: {
          backgroundColor: "#ff0000", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
      return;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando...
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="px-6 py-4">
        <Card className="debug-border ">
          <CardContent className="p-4 py-4 debug-border ">
            <div className="px-6">
              {profissional ? (
                <div className="flex flex-col sm:flex-row  gap-6 items-center">
                  <div className="relative ">
                    <img
                      src={profissional.foto}
                      alt={profissional.nome}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className=" object-cover rounded-2xl min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold capitalize ">{`${profissional.nome} ${profissional.sobreNome}`}</h1>
                  </div>

                  <div className="flex-1 flex flex-col items-center sm:items-end">
                    <div className="flex flex-col items-center sm:items-end gap-3">
                      <div className="flex items-center justify-between w-full">
                        <p className="text-xl">Telefones</p>
                        <TelefoneProfissional
                          idProfissional={profissional.id}
                        />
                      </div>
                      <table className="table-auto w-full">
                        <tbody>
                          {telefones && telefones.length > 0 ? (
                            telefones.map((telefone) => (
                              <tr
                                key={telefone.id}
                                className="flex gap-5 items-center justify-between"
                              >
                                <td className="px-1 text-sm ">
                                  {telefone.numero}
                                </td>
                                <td className=" text-sm text-left">
                                  <Button
                                    variant="transparent"
                                    className="text-[#ff6666] gap-2 ml-auto "
                                    onClick={() =>
                                      removeTelefone(
                                        telefone.id,
                                        telefone.numero
                                      )
                                    }
                                  >
                                    <X size={16} />
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={2} className="px-2 pt-3 text-center">
                                Nenhum telefone cadastrado
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div>Caregando...</div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="pt-3">
          <Card>
            <CardContent className="p-0">
              <div className="px-12 p-3 flex justify-between ">
                <h1 className="p-1 font-semibold text-xl">Serviços</h1>
                {profissional && (
                  <SelectServicos profissionalId={profissional.id} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className=" pt-3">
          <ServicosProfissional />
        </div>
      </div>
    </>
  );
};

export default ProfissionalDetailsPage;
