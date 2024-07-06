import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import { toast } from "sonner";

type FormValues = {
  foto: string;
  nome: string;
  cnpj: string;
  razaoSocial: string;
};

interface BarbershopEditProfileProps {
  id: string;
  nome: string;
  foto: string;
  cnpj: string;
  razaoSocial: string;
  onProfileUpdated: ()=>void;
}

const FormEdit: React.FC<BarbershopEditProfileProps> = ({
  id,
  foto,
  nome,
  cnpj,
  razaoSocial,
  onProfileUpdated,
}) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> =async (data) => {
    setIsFormOpen(false);
    try {
      const response = await api.put(`/barbearia/${id}`, data);
      console.log(response.data)
      onProfileUpdated();
      toast.success("Barbearia atualizada com sucesso!",{
        style: {
          backgroundColor: "#4CAF50", // Cor de fundo
          color: "#FFFFFF", // Cor do texto
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
    console.log(data); // Aqui você pode acessar os dados do formulário
  };

  useEffect(() => {
    setValue("nome", nome);
    setValue("foto", foto);
    setValue("cnpj", cnpj);
    setValue("razaoSocial", razaoSocial);
  }, [nome, foto, cnpj, razaoSocial, setValue]);

  // Função para validar o CNPJ
  function validateCNPJ(cnpj: string) {
    const cleanedCNPJ = cnpj.replace(/\D/g, ""); // Remover caracteres não numéricos

    // Verificar se o CNPJ possui 14 dígitos
    if (cleanedCNPJ.length !== 14) {
      return "CNPJ must have 14 digits";
    }

    // Calcular os dígitos verificadores
    let sum = 0;
    let position = 5;

    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanedCNPJ.charAt(i)) * position;
      position--;

      if (position < 2) {
        position = 9;
      }
    }

    let remainder = sum % 11;
    const firstDigit = remainder < 2 ? 0 : 11 - remainder;

    sum = 0;
    position = 6;

    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanedCNPJ.charAt(i)) * position;
      position--;

      if (position < 2) {
        position = 9;
      }
    }

    remainder = sum % 11;
    const secondDigit = remainder < 2 ? 0 : 11 - remainder;

    // Verificar se os dígitos verificadores estão corretos
    if (
      parseInt(cleanedCNPJ.charAt(12)) !== firstDigit ||
      parseInt(cleanedCNPJ.charAt(13)) !== secondDigit
    ) {
      return "Invalid CNPJ";
    }

    return; // Retorna uma string vazia se o CNPJ for válido
  }

  if (!isFormOpen) {
    return <p>Formulário enviado com sucesso! Fechando...</p>;
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          <div className="grid grid-cols-1 gap-4">
            <FormItem>
              <FormLabel>Foto</FormLabel>
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
          <div className="grid grid-cols-2  gap-4">
            <FormItem>
              <FormLabel>nome</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Digite o nome"
                  {...register("nome", { required: "Nome é requerido" })}
                />
              </FormControl>
              {errors.nome && (
                <p className="text-red-500">{errors.nome.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Digite o cnpj"
                  {...register("cnpj", {
                    required: "cnpj é requerido",
                    validate: validateCNPJ,
                  })}
                />
              </FormControl>
              {errors.cnpj && (
                <p className="text-red-500">{errors.cnpj.message}</p>
              )}
            </FormItem>
          </div>

          <div className="grid grid-cols-1  gap-4">
            <FormItem>
              <FormLabel>Razão social</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a razão social"
                  {...register("razaoSocial", {
                    required: "Razão social é requerido",
                  })}
                />
              </FormControl>
              {errors.razaoSocial && (
                <p className="text-red-500">{errors.razaoSocial.message}</p>
              )}
            </FormItem>
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormEdit;
