import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {api} from "../../../config/ConfigAxios"
import { useNavigate } from "react-router-dom";

type FormValues = {
  foto: string;
  nome: string;
  email: string;
  cpf: string;
  razaoSocial: string;
  cnpj: string;
  senha: string;
};

const FormCadastroUser = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> =  async (data) => {
    if(!window.confirm('Confirma o Casdastro ?')){
      return;
    }
    try {
      const respose = await api.post("/barbearias",{
        ...data,
      })
      console.log(respose.data);
      limpaFormulario();
      navigate('/home')

    } catch (error) {
      console.error("Erro cadastro", error);
    }
    console.log(data); // Aqui você pode acessar os dados do formulário
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
      cpf: "",
      razaoSocial: "",
      cnpj: "",
      senha: ""
    })
  }
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
                  })}
                />
              </FormControl>
              {errors.cnpj && (
                <p className="text-red-500">{errors.cnpj.message}</p>
              )}
            </FormItem>
          </div>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite o e-mail"
                {...register("email", {
                  required: "E-mail é requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </FormControl>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </FormItem>

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

          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="create one password"
                {...register("senha", {
                  required: "A senha é requerido",
                  minLength: {
                    value: 6,
                    message: "A senha deve conter mais de 6 caracteres",
                  },
                })}
              />
            </FormControl>
            {errors.senha && (
              <p className="text-red-500">{errors.senha.message}</p>
            )}
          </FormItem>

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormCadastroUser;
