import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";

type FormValues = {
  Photograph: string;
  name: string;
  price: string;
  description: string;
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
              <FormLabel>Photograph</FormLabel>
              <FormControl>
                <Input
                  className="w-full "
                  placeholder="URL da foto"
                  {...register("Photograph", { required: "Photograph is required" })}
                />
              </FormControl>
              {errors.Photograph && (
                <p className="text-red-500">{errors.Photograph.message}</p>
              )}
            </FormItem>
          </div>
          <div className="grid grid-cols-2  gap-4">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your email"
                  {...register("name", { required: "Name is required" })}
                />
              </FormControl>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="w-full"

                  placeholder="Enter your price"
                  {...register("price", {
                    required: "Price is required",
                    validate: validatePrice,
                  })}
                />
              </FormControl>
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </FormItem>
          </div>
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                className="w-full"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </FormControl>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </FormItem>

          <Button type="submit">To save</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormEditService;
