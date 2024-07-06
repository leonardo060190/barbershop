import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../../config/ConfigAxios";

type FormValues = {
  foto: string;
  nome: string;
  email: string;
  razaoSocial: string;
  cnpj: string;
 
};

const FormCadastroBarbershop = ({endereco, onSave }: {endereco: number | null, onSave: (id: number) => void }) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    try {
      const response = await api.post("/barbearia", {
        ...data,
        endereco: {id: endereco},
      });
      console.log(response.data);
      limpaFormulario();
      onSave(response.data.id);
      console.log("barber",response.data.id);
    } catch (error) {
      console.error("Erro cadastro", error);
    }
    console.log(data); // Aqui você pode acessar os dados do formulário
  };

  //função para formatar o cnpj
  const formatCnpj = (value: string) => {
    // Remove caracteres não numéricos
    value = value.replace(/\D/g, "");

    value = value.slice(0, 14);
    
    // Aplica a máscara de CNPJ (##.###.###/####-##)
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i === 2 || i === 5) {
        formattedValue += ".";
      } else if (i === 8) {
        formattedValue += "/";
      } else if (i === 12) {
        formattedValue += "-";
      }
      formattedValue += value[i];
    }
    return formattedValue;
  };

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

  const limpaFormulario = () => {
    reset({
      foto: "",
      nome: "",
      email: "",
      razaoSocial: "",
      cnpj: "",
    });
  };
  return (
    <div className="items-center">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 grid gap-3 sm:grid-cols-1"
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
                  placeholder="Digite o CNPJ"
                  {...register("cnpj", {
                    required: "CNPJ é requerido",
                    validate: validateCNPJ,
                    onChange: (e) =>
                      setValue("cnpj", formatCnpj(e.target.value)),
                    maxLength: 18,
                  })}
                />
              </FormControl>
              {errors.cnpj && (
                <p className="text-red-500">{errors.cnpj.message}</p>
              )}
            </FormItem>
          </div>

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

          <Button type="submit">Continuar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormCadastroBarbershop;
