import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../../config/ConfigAxios";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  senha: string;
};

interface FormCadastroLoginProps {

  barbearia?: number | null;
}

const FormCadastroBarbeariaLogin = ({  barbearia }: FormCadastroLoginProps) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    try {
      const respose = await api.post("/login", {
        ...data,
        barbearia: { id: barbearia },
      });
      console.log(respose.data);
      limpaFormulario();
      navigate("/home");
    } catch (error) {
      console.error("Erro cadastro", error);
    }
    console.log(data); // Aqui você pode acessar os dados do formulário
  };

  const limpaFormulario = () => {
    reset({
      email: "",
      senha: "",
    });
  };
  return (
    <div className="items-center">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 grid gap-3 sm:grid-cols-1"
        >
          <div className="grid grid-cols-1 gap-4"></div>

          <div className="grid grid-cols-2 gap-4"></div>
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
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Crie uma senha com mais de 6 caracteres!"
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

          <Button type="submit">Finalizar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormCadastroBarbeariaLogin;
