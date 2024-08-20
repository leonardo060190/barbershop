import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";

import { api } from "../../../../../../config/ConfigAxios";
import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
} from "../../../../../components/ui/form";

import { toast } from "sonner";

type FormValues = {
  numero: string;
};

interface IdProfissionalRegisterTelefone {
  idProfissional: string;
}

interface Telefone {
  id: string;
  numero: string;
}

const FormTelefoneProfissional: React.FC<IdProfissionalRegisterTelefone> = ({
  idProfissional,
}) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [telefones, setTelefones] = useState<Telefone[]>([]);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const obterTelefones = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await api.get(
        `/telefone/profissional/${idProfissional}`
      );
      setTelefones(response.data);
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  }, [idProfissional]);

  useEffect(() => {
    if (idProfissional) {
      obterTelefones();
    }
  }, [idProfissional, obterTelefones]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (telefones.length >= 2) {
      toast.error("Você só pode cadastrar até dois telefones.", {
        style: {
          backgroundColor: "#ff0000", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
      return;
    }

    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    const requestData = {
      ...data,
      profissional: { id: idProfissional },
    };
    console.log(requestData);

    try {
      const response = await api.post("/telefone", requestData);
      console.log(response.data);
      setIsFormOpen(false);
      reset();
      window.location.reload();
      toast.success("Telefone cadastrado com sucesso!", {
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro cadastro", error);
    }
  };

  //função para formatar o cpf
  const formatTelefone = (value: string) => {
    value = value.replace(/\D/g, "");

    value = value.slice(0, 11);

    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i === 0) {
        formattedValue += "(";
      } else if (i === 2) {
        formattedValue += ") ";
      } else if (i === 7) {
        formattedValue += "-";
      }
      formattedValue += value[i];
    }
    return formattedValue;
  };

  if (!isFormOpen) {
    return <p>Formulário enviado com sucesso!</p>;
  }

  return (
    <div key={idProfissional}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          <div className="grid grid-cols-1  gap-4">
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="(00) 00000-0000"
                  {...register("numero", {
                    required: "O número do telefone é requerido",
                    onChange: (e) =>
                      setValue("numero", formatTelefone(e.target.value)),
                  })}
                />
              </FormControl>
              {errors.numero && (
                <p className="text-red-500">{errors.numero.message}</p>
              )}
            </FormItem>
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormTelefoneProfissional;
