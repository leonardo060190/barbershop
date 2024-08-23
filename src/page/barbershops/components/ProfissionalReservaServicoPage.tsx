import Header from "@/components/header/header";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "../../../../config/ConfigAxios";
import ServiceItem from "./serviceItem";

interface Barbearia {
  id: string;
  nome: string;
}

interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
}

interface Profissional {
  id: string;
  nome: string;
  sobreNome: string;
  foto: string;
  servicos: Servico[];
}

interface Telefone {
  id: string;
  numero: string;
}

interface ProfissionalServicoResponse {
  id: string;
  profissional: Profissional;
  servico: Servico;
  barbearia: Barbearia;
}

const ProfissionalReservaServicoPage = () => {
  const { id } = useParams<{ id: string }>();

  const [profissional, setProfissional] = useState<Profissional>();
  const [telefones, setTelefones] = useState<Telefone[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [barbearia, setBarbearia] = useState<Barbearia>();
  const location = useLocation();

  const barbeariaId = location.state?.barbeariaId;

  const obterProfissionais = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<ProfissionalServicoResponse[]>(
        `/profissionalServico/profissionalServico/${id}`
      );
      const dadosProfissional = response.data[0].profissional; // Assume que o primeiro item representa o profissional
      dadosProfissional.servicos = response.data.map((item) => item.servico); // Associa os serviços
      setProfissional(dadosProfissional);
      console.log("profissional", dadosProfissional);
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados: ${error}`);
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

  const obterBarbearia = useCallback(async () => {
    try {
      const response = await api.get<Barbearia>(`/barbearia/${barbeariaId}`);
      setBarbearia(response.data);
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados da barbearia: ${error}`);
    }
  }, [barbeariaId]);

  useEffect(() => {
    if (id) {
      obterProfissionais();
      obterTelefones();
      if (barbeariaId) {
        obterBarbearia();
      }
    }
  }, [id, barbeariaId, obterProfissionais, obterTelefones, obterBarbearia]);

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

        <div className="pt-5 grid gap-5  grid-cols-1  xl:grid-cols-2">
          {profissional?.servicos.length && barbearia ? (
            profissional.servicos.map((servico) => (
              <ServiceItem
                key={servico.id} // Use um identificador único se disponível
                id={servico.id}
                nome={servico.nome}
                foto={servico.foto}
                descricao={servico.descricao}
                preco={servico.preco}
                profissionalId={profissional.id}
                nomeProfissional={profissional.nome}
                nomeBarbearia={barbearia.nome}
                barbeariaId={barbearia.id}
              />
            ))
          ) : (
            <div>Nenhum serviço disponível</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfissionalReservaServicoPage;
