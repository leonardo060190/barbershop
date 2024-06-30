import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../../../config/ConfigAxios";
import { useAuth } from "@/components/authProvider/AuthProvider";

type FormValues = {
  email: string;
  senha: string;
};

interface FormEditLoginProps {
  id: string;
  idBarbershop: string;
  email: string;
  senha: string;
  
  
}

const FormEditLoginBarbearia: React.FC<FormEditLoginProps> = ({
  id,
  email,
  idBarbershop,
 
}) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const {logout} = useAuth();
  
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsFormOpen(false);
    try {
      const response = await api.put(`/login/${id}`, {
        ...data,
        barbearia: { id: idBarbershop },
      });
      console.log(response.data);
      logout();
    } catch (error) {
      console.error("Erro ao atualizar o serviço:", error);
    }
    console.log(data); // Aqui você pode acessar os dados do formulário
  };

  useEffect(() => {
    setValue("email", email);
   
  }, [email, setValue]);

  if (!isFormOpen) {
    return <p>Formulário enviado com sucesso! Fechando...</p>;
  }

  return (
    <div key={id}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          <div className="grid grid-cols-1 gap-4">
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  className="w-full "
                  {...register("email", { required: "E-mail é requerido" })}
                />
              </FormControl>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </FormItem>
          </div>
          <div className="grid grid-cols-1  gap-4">
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  {...register("senha", { required: "Adicione uma nova senha ou confirme a senha de cadastro" })}
                />
              </FormControl>
              {errors.senha && (
                <p className="text-red-500">{errors.senha.message}</p>
              )}
            </FormItem>
          </div>

          <Button type="submit">Confirmar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormEditLoginBarbearia;
