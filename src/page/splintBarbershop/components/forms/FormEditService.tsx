import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";

type FormValues = {
  foto: string;
  nome: string;
  preco: string;
  descricao: string;
};

const FormEditService = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  // const [isFormOpen, setIsFormOpen] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // setIsFormOpen(false);
    console.log(data); // Aqui você pode acessar os dados do formulário
  };

  // Função de validação customizada para verificar se é um número válido
  const validatePrice = (value: string) => {
    const isValidNumber = !isNaN(parseFloat(value));
    if (!isValidNumber) {
      return "Please enter a valid number for the price";
    }
    return true;
  };

  // if (!isFormOpen) {
  //   return <p>Formulário enviado com sucesso! Fechando...</p>;
  // }

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
          <div className="grid grid-cols-2  gap-4">
            <FormItem>
              <FormLabel>Nome</FormLabel>
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
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-full"

                  placeholder="Digite o preço"
                  {...register("preco", {
                    required: "Preço é requerido",
                    validate: validatePrice,
                  })}
                />
              </FormControl>
              {errors.preco && (
                <p className="text-red-500">{errors.preco.message}</p>
              )}
            </FormItem>
          </div>
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                className="w-full"
                placeholder="Faça uma descrição"
                {...register("descricao", {
                  required: "Descrição é requerido",
                })}
              />
            </FormControl>
            {errors.descricao && (
              <p className="text-red-500">{errors.descricao.message}</p>
            )}
          </FormItem>

          <Button type="submit">To save</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormEditService;
