import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";


type FormValues = {
    telefone: string;
  
  };

const FormTelefone = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [formattedTelefone, setFormattedTelefone] = useState(""); // Estado local para armazenar o valor formatado do telefone


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // Aqui você pode acessar os dados do formulário
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters from the input value
    const cleanedValue = value.replace(/\D/g, "");
  
    // Initialize formattedValue with the cleanedValue
    let formattedValue = cleanedValue;
  
    // Apply formatting based on the length of cleanedValue
    if (cleanedValue.length >= 2) {
        formattedValue = `(${cleanedValue.slice(0, 2)}`;
      }
      if (cleanedValue.length > 2) {
        formattedValue += `) ${cleanedValue.slice(2, 7)}`;
      }
      if (cleanedValue.length > 7) {
        formattedValue += `-${cleanedValue.slice(7, 11)}`;
      }
  
    // Update the local state with the formattedValue
    setFormattedTelefone(formattedValue);
  
    // Return the cleaned value for validation
    return cleanedValue;
  };


  return (
    <div>
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
                  {...register("telefone", {
                    required: "O número do telefone é requerido",
                    validate: (value) => {
                      // Ensure the value is a valid phone number (only digits)
                      const isValid = /^\d{11}$/.test(value.replace(/\D/g, ""));
                      return isValid || "Por favor, insira um telefone válido";
                    },
                    setValueAs: (value) => formatPhoneNumber(value), // Define o valor do campo usando a função de formatação

                  })}
                  value={formattedTelefone} // Use o estado local para exibir o valor formatado

                  onChange={(e) => formatPhoneNumber(e.target.value)}
                />
              </FormControl>
              {errors.telefone && (
                <p className="text-red-500">{errors.telefone.message}</p>
              )}
            </FormItem>
          </div>
          <Button type="submit">To save</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormTelefone;
