import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { api } from "../../../../../config/ConfigAxios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FormValues = {
  foto: string;
  nome: string;
  cpf: string;
  sobreNome: string;
  dataNascimento: string;
};

interface ClienteEditProfileProps {
  id: string;
  nome: string;
  foto: string;
  cpf: string;
  sobreNome: string;
  dataNascimento: string;
  onClienteUpdated: () => void;
}

const FormEditCliente: React.FC<ClienteEditProfileProps> = ({
  id,
  foto,
  nome,
  cpf,
  sobreNome,
  dataNascimento,
  onClienteUpdated,
}) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    setIsFormOpen(false);

    const dataNascimentoFormatada = converterDataParaFormatoBanco(
      data.dataNascimento
    );

    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    try {
      const response = await api.patch(`/cliente/${id}`, {
        ...data,
        dataNascimento: dataNascimentoFormatada,
      });
      onClienteUpdated();
      console.log(response.data);
      toast.success("Cliente atualizado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro cadastro", error);
    }
  };

  useEffect(() => {
    setValue("nome", nome);
    setValue("foto", foto);
    setValue("cpf", cpf);
    setValue("sobreNome", sobreNome);
    setValue("dataNascimento", converterDataParaExibicao(dataNascimento));
  }, [nome, foto, cpf, sobreNome, dataNascimento, setValue]);

  //função para formatar o cpf
  const formatCpf = (value: string) => {
    value = value.replace(/\D/g, "");

    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i === 3 || i === 6) {
        formattedValue += ".";
      } else if (i === 9) {
        formattedValue += "-";
      }
      formattedValue += value[i];
    }
    return formattedValue;
  };

  // Função para validar o CPF
  function validateCPF(cpf: string) {
    // Remover caracteres não numéricos
    const cleanedCPF = cpf.replace(/\D/g, "");

    // Verificar se o CPF possui 11 dígitos
    if (cleanedCPF.length !== 11) {
      return "CPF must have 11 digits";
    }

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanedCPF)) {
      return "Invalid CPF";
    }

    // Calcular dígito verificador
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(9, 10))) {
      return "Invalid CPF";
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(10, 11))) {
      return "Invalid CPF";
    }

    return;
  }

  // Função para formatar a data de nascimento enquanto o usuário digita
  const formatarDataNascimento = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Formata a data de nascimento como dd/mm/yyyy
    let formattedValue = "";
    for (let i = 0; i < numericValue.length; i++) {
      if (i === 2 || i === 4) {
        formattedValue += "-";
      }
      formattedValue += numericValue[i];
    }
    return formattedValue;
  };

  // Função para converter a data formatada para o formato desejado (yyyy-MM-dd)
  const converterDataParaFormatoBanco = (value: string) => {
    const [day, month, year] = value.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  // Função para converter a data de 'yyyy-MM-dd' para 'dd-MM-yyyy' para exibição
  const converterDataParaExibicao = (value: string) => {
    const [year, month, day] = value.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  if (!isFormOpen) {
    return <p>Formulário enviado com sucesso! Fechando...</p>;
  }

  return (
    <div className="">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          <div className="grid grid-cols-1 gap-4">
            <FormItem>
              <FormLabel>foto</FormLabel>
              <FormControl>
                <Input
                  className="w-full "
                  placeholder="URL da foto"
                  {...register("foto", { required: "Foto é requerido" })}
                />
              </FormControl>
              {errors.foto && (
                <p className="text-red-500">{errors.foto.message}</p>
              )}
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="w-full "
                  placeholder="Digite o nome"
                  {...register("nome", { required: "Nome é requerido" })}
                />
              </FormControl>
              {errors.nome && (
                <p className="text-red-500">{errors.nome.message}</p>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Digite o sobrenome"
                  {...register("sobreNome", {
                    required: "Sobrenome é requerido",
                  })}
                />
              </FormControl>
              {errors.sobreNome && (
                <p className="text-red-500">{errors.sobreNome.message}</p>
              )}
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Digite o cpf"
                  {...register("cpf", {
                    required: "CPF é requerido",
                    validate: validateCPF,
                    onChange: (e) => setValue("cpf", formatCpf(e.target.value)),
                  })}
                />
              </FormControl>
              {errors.cpf && (
                <p className="text-red-500">{errors.cpf.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Digite a data de nascimento"
                  {...register("dataNascimento", {
                    required: "Data de nascimento é requerido",
                  })}
                  onChange={(e) => {
                    const formattedValue = formatarDataNascimento(
                      e.target.value
                    );
                    setValue("dataNascimento", formattedValue);
                  }}
                  maxLength={10}
                />
              </FormControl>
              {errors.dataNascimento && (
                <p className="text-red-500">{errors.dataNascimento.message}</p>
              )}
            </FormItem>
          </div>

          <Button type="submit">Confirmar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormEditCliente;
