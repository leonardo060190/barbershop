import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type FormValues = {
  Photograph: string;
  name: string;
  cnpj: string;
  email: string;
  socialreason: string;
  password: string;
};

const FormEdit = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsFormOpen(false);
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
          <div className="grid grid-cols-2  gap-4">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your Name"
                  {...register("name", { required: "Name is required" })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Enter your CNPJ"
                  {...register("cnpj", {
                    required: "cnpj is required",
                    validate: validateCNPJ,
                  })}
                />
              </FormControl>
              {errors.cnpj && (
                <p className="text-red-500">{errors.cnpj.message}</p>
              )}
            </FormItem>
          </div>

          <div className="grid grid-cols-1 gap-4">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
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
          </div>
          <div className="grid grid-cols-1  gap-4">
          <FormItem>
            <FormLabel>Razão social</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your social reason"
                {...register("socialreason", {
                  required: "social reason is required",
                })}
              />
            </FormControl>
            {errors.socialreason && (
              <p className="text-red-500">{errors.socialreason.message}</p>
            )}
          </FormItem>
          </div>
          <div className="grid grid-cols-1  gap-4">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="create one password"
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
          </div>
          
          <Button type="submit">To save</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormEdit;
