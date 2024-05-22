import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
import { cn } from "@/lib/utils"

type FormValues = {
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
  cidade: string;
};

const FormAddress = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
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

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          <div className="grid grid-cols-1  gap-4">
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Digite o nome da rua"
                  {...register("rua", {
                    required: "O nome da rua é requerido",
                  })}
                />
              </FormControl>
              {errors.rua && (
                <p className="text-red-500">{errors.rua.message}</p>
              )}
            </FormItem>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Digite o name do bairro"
                  {...register("bairro", {
                    required: "O nome do bairro é requerido",
                  })}
                />
              </FormControl>
              {errors.bairro && (
                <p className="text-red-500">{errors.bairro.message}</p>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o número"
                  {...register("numero", {
                    required: "O número é requerido",
                    validate: validateNumber,
                  })}
                />
              </FormControl>
              {errors.numero && (
                <p className="text-red-500">{errors.numero.message}</p>
              )}
            </FormItem>
          </div>
          <div className="grid grid-cols-2  gap-4">
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o cep"
                  {...register("cep", {
                    required: "O cep é requerido",
                    validate: validateZipcode,
                  })}
                />
              </FormControl>
              {errors.cep && (
                <p className="text-red-500">{errors.cep.message}</p>
              )}
            </FormItem>

            <FormItem>
              {/* <FormLabel>City</FormLabel>
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
              )} */}

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          </div>

          <Button type="submit">To save</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormAddress;
