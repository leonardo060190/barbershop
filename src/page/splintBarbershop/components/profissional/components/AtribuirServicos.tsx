import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "../../../../../../config/ConfigAxios";
import { toast } from "sonner";

type FormValues = {
  servicoId: string;
  profissionalId: string;
  nome: string;
  preco: string;
  descricao: string;
  foto: string;
};

// Defina o tipo para o objeto de serviço
interface Servico {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  foto: string;
}

type AtribuirServicosProps = {
  profissionalId: string;
};

const AtribuirServicos: React.FC<AtribuirServicosProps> = ({
  profissionalId,
}) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [nomeServico, setNomeServico] = useState<string>("");
  console.log("1", nomeServico);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  // Obter a lista de serviços
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get<Servico[]>("/servico"); // Ajuste o endpoint conforme necessário
        setServicos(response.data);
      } catch (error) {
        console.error("Erro ao obter serviços", error);
      }
    };

    fetchServicos();
  }, []);

  // Preencher o formulário ao selecionar um serviço
  useEffect(() => {
    if (selectedServico) {
      setValue("nome", selectedServico.nome);
      setValue("preco", selectedServico.preco);
      setValue("descricao", selectedServico.descricao);
      setValue("foto", selectedServico.foto);
      setNomeServico(selectedServico.nome);
    }
  }, [selectedServico, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    try {
      const response = await api.post("/profissionalServico", {
        ...data,
        servico: { id: data.servicoId },
        profissional: { id: profissionalId },
      });
      console.log("profissionalServico", response.data);
      setIsFormOpen(false);
      toast.success("Serviço cadastrado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
      console.log(data);
    } catch (error) {
      console.error("Erro cadastro", error);
    }
  };

  if (!isFormOpen) {
    return <p>Formulário enviado com sucesso!</p>;
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          <FormItem>
            <FormLabel>Selecionar Serviço</FormLabel>
            <Select
              onValueChange={(value) => {
                const selected = servicos.find((s) => s.id === value);
                setSelectedServico(selected || null);
                setValue("servicoId", value, { shouldValidate: true });

                if (selected) {
                  setValue("nome", selected.nome);
                  setValue("preco", selected.preco);
                  setValue("descricao", selected.descricao);
                  setValue("foto", selected.foto);
                  setNomeServico(selected.nome);
                }
              }}
              
              value={selectedServico?.id && "nomeServico"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o serviço">
                {nomeServico || "Selecione um serviço"}

                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Serviços</SelectLabel>
                  {servicos.map((servico) => (
                    <SelectItem key={servico.id} value={servico.id}>
                      {servico.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("servicoId", {
                required: "O servico é requerido",
                validate: (value) => value !== "" || "O servico é requerido",
              })}
            />

            {errors.servicoId && (
              <p className="text-red-500">{errors.servicoId.message}</p>
            )}
          </FormItem>

          <div className="grid grid-cols-1 gap-4">
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <Input className="w-full " {...register("foto")} disabled />
              </FormControl>
            </FormItem>
          </div>
          <div className="grid grid-cols-2  gap-4">
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input className="w-full" {...register("nome")} disabled />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-full"
                  {...register("preco")}
                  disabled
                />
              </FormControl>
            </FormItem>
          </div>
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                className="w-full"
                placeholder="Faça uma descrição"
                {...register("descricao")}
                disabled
              />
            </FormControl>
          </FormItem>

          <Button type="submit">Salvar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AtribuirServicos;
