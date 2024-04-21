import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormValues = {
  name: string;
  email: string;
  cpf: string;
  lastname: string;
  password: string;
  birthDate: string;
};

const FormCadastroUser = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // Aqui você pode acessar os dados do formulário
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

  return (
    <div className="">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full "
                  placeholder="Enter your user name"
                  {...register("name", { required: "Name is required" })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your last name"
                  {...register("lastname", {
                    required: "last name is required",
                  })}
                />
              </FormControl>
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}
            </FormItem>
          </div>
          
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                className="w-full"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
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
          
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your CPF"
                  {...register("cpf", {
                    required: "CPF is required",
                    validate: validateCPF,
                  })}
                />
              </FormControl>
              {errors.cpf && (
                <p className="text-red-500">{errors.cpf.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel> Birth date</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your birth date"
                  {...register("birthDate", {
                    required: "Birth date is required",
                  })}
                />
              </FormControl>
              {errors.birthDate && (
                <p className="text-red-500">{errors.birthDate.message}</p>
              )}
            </FormItem>
          </div>
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                className="w-full"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />
            </FormControl>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </FormItem>

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormCadastroUser;
