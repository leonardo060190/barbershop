import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = {
  road: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  city: string;
};

const FormAddress = () => {
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

  // Função de validação customizada para verificar se é um número válido
  const validateNumber = (value: string) => {
    const isValidNumber = !isNaN(parseInt(value));
    if (!isValidNumber) {
      return "Please enter a valid number";
    }
    return true;
  };

  // Função para validar o CEP
  const validateZipcode = (value: string) => {
    const cepRegex = /^[0-9]{8}$/; // Expressão regular para validar um CEP com exatamente 8 dígitos numéricos
    if (!value.match(cepRegex)) {
      return "Please enter a valid zip code (8 digits)";
    }
    return true; // CEP válido
  };

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
          <div className="grid grid-cols-1  gap-4">
            <FormItem>
              <FormLabel>name of the street</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="name of the street"
                  {...register("road", {
                    required: "name of the street required",
                  })}
                />
              </FormControl>
              {errors.road && (
                <p className="text-red-500">{errors.road.message}</p>
              )}
            </FormItem>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>neighborhood name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your bairro"
                  {...register("neighborhood", {
                    required: "neighborhood is required",
                  })}
                />
              </FormControl>
              {errors.neighborhood && (
                <p className="text-red-500">{errors.neighborhood.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your number"
                  {...register("number", {
                    required: "number is required",
                    validate: validateNumber,
                  })}
                />
              </FormControl>
              {errors.number && (
                <p className="text-red-500">{errors.number.message}</p>
              )}
            </FormItem>
          </div>
          <div className="grid grid-cols-2  gap-4">
            <FormItem>
              <FormLabel>Zip code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your zip code"
                  {...register("zipcode", {
                    required: "cep is required",
                    validate: validateZipcode,
                  })}
                />
              </FormControl>
              {errors.zipcode && (
                <p className="text-red-500">{errors.zipcode.message}</p>
              )}
            </FormItem>

           <FormItem> 
              <FormLabel>City</FormLabel>
              <Select
                {...register("city", { required: "Please select a city" })}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="city1">city1</SelectItem>
                  <SelectItem value="city2">city2</SelectItem>
                  <SelectItem value="city3">city3</SelectItem>
                  <SelectItem value="city4">city4</SelectItem>
                  <SelectItem value="city5">city5</SelectItem>
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </FormItem>
          </div>

          <Button type="submit">To save</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormAddress;
