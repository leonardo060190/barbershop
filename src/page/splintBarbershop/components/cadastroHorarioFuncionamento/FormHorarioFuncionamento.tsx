import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

import { api } from "../../../../../config/ConfigAxios";
import { useAuth } from "@/components/authProvider/AuthProvider";
import { toast } from "sonner";

interface FormValues {
  abri: string;
  fecha: string;
  diaSemana: string;
}

interface DiaSemana {
  id: string;
  nome: string;
}

interface FormHorarioFuncionamentoProps {
  onHorarioAdicionado: () => void;
}

const FormHorarioFuncionamento: React.FC<FormHorarioFuncionamentoProps> = ({
  onHorarioAdicionado,
}) => {
  const methods = useForm<FormValues>();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [diaSemana, setDiaSemana] = useState<DiaSemana[]>([]);
  const selectedDiaSemana = watch("diaSemana");
  const { user } = useAuth();
  const barbeariaId = user?.barbearia?.id || null;

  useEffect(() => {
    const fetchDiaSemana = async () => {
      try {
        const response = await api.get(`/diaSemana`);
        setDiaSemana(response.data);
        console.log("fetchDiaSemana", response.data);
      } catch (error) {
        console.error("Erro ao buscar os dias das semana:", error);
      }
    };
    if (barbeariaId) {
      fetchDiaSemana();
    }
  }, [barbeariaId]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data); // Aqui você pode acessar os dados do formulário
    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    try {
      const response = await api.post("/horarioFuncionamento", {
        ...data,
        barbearia: { id: barbeariaId },
        diaSemana: { id: data.diaSemana },
      });
      console.log(response.data);
      limparFormulario();
      setIsFormOpen(false);
      onHorarioAdicionado();
      toast.success("Horario cadastrado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro cadastro", error);
    }
  };

  const limparFormulario = () => {
    reset({
      abri: "",
      fecha: "",
      diaSemana: "",
    });
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
          <div className="">
            <FormItem>
              <FormLabel>Dia Semana</FormLabel>
              <Select onValueChange={(value) => setValue("diaSemana", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o dia da semana">
                    {selectedDiaSemana
                      ?(diaSemana.find((dia) => dia.id === selectedDiaSemana)
                          ?.nome
                     ) : ("Selecione o dia da semana")}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Selecione o dia da semana</SelectLabel>
                    {diaSemana.map((dia) => (
                      <SelectItem key={dia.id} value={dia.id}>
                        {dia.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.diaSemana && (
                <p className="text-red-500">{errors.diaSemana.message}</p>
              )}
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Abertura</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Horario de abertura"
                  {...register("abri", {
                    required: "Horario requerido",
                  })}
                />
              </FormControl>
              {errors.abri && (
                <p className="text-red-500">{errors.abri.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>Fechamento</FormLabel>
              <FormControl>
                <Input
                  placeholder="Horario de fechamento"
                  {...register("fecha", {
                    required: "Horario requerido",
                  })}
                />
              </FormControl>
              {errors.fecha && (
                <p className="text-red-500">{errors.fecha.message}</p>
              )}
            </FormItem>
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormHorarioFuncionamento;
