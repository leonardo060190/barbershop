import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "../../../config/ConfigAxios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type FormValues = {
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
  cidade: string;
};

const FormAddress = ({ onSave }: { onSave: (id: number) => void }) => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [estados, setEstados] = React.useState<{ id: string; nome: string }[]>(
    []
  );
  const [cidades, setCidades] = React.useState<{ id: string; nome: string }[]>(
    []
  );
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedCidade, setSelectedCidade] = useState("");
  console.log(estados, selectedCidade);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await api.get(`/estado`);
        setEstados(response.data);
        console.log("fetchEstados", response.data);
      } catch (error) {
        console.error("Erro ao buscar os estados:", error);
      }
    };

    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await api.get(`/cidade/estado/${selectedEstado}`);
        setCidades(response.data);
        console.log("fetchCidades", response.data);
      } catch (error) {
        console.error("Erro ao buscar as cidades:", error);
      }
    };

    if (selectedEstado) {
      fetchCidades();
    } else {
      setCidades([]);
    }
  }, [selectedEstado]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data); // Aqui você pode acessar os dados do formulário
    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    try {
      const response = await api.post("/endereco", {
        ...data,
      });
      console.log(response.data);
      limparFormulario();
      setIsFormOpen(false);
      onSave(response.data.id);
    } catch (error) {
      console.error("Erro cadastro", error);
    }
  };

  // Função de validação customizada para verificar se é um número válido
  const validateNumber = (value: string) => {
    const isValidNumber = !isNaN(parseInt(value));
    if (!isValidNumber) {
      return "Please enter a valid number";
    }
    return true;
  };

  // Função para formatar o CEP no formato 00000-000
  const formatCep = (value: string) => {
    value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito
    if (value.length > 5) {
      value = value.slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  // Função para validar o CEP
  const validateZipcode = (value: string) => {
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/; // Expressão regular para validar um CEP com exatamente 8 dígitos numéricos
    if (!value.match(cepRegex)) {
      return "Por favor entre com um cep valido!";
    }
    return true; // CEP válido
  };

  if (!isFormOpen) {
    return <p>Formulário enviado com sucesso!</p>;
  }

  const limparFormulario = () => {
    reset({
      rua: "",
      bairro: "",
      numero: "",
      cep: "",
      cidade: "",
    });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3  grid gap-3 sm:grid-cols-1"
        >
          <div className="grid grid-cols-2  gap-4">
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

            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o cep"
                  {...register("cep", {
                    required: "O cep é requerido",
                    validate: validateZipcode,
                    onChange: (e) => setValue("cep", formatCep(e.target.value)),
                    maxLength: 9,
                  })}
                />
              </FormControl>
              {errors.cep && (
                <p className="text-red-500">{errors.cep.message}</p>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2  gap-4">
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setSelectedEstado(value);
                    setSelectedCidade("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um estado">
                      {selectedEstado
                        ? estados.find((estado) => estado.id === selectedEstado)
                            ?.nome
                        : "Selecione um estado"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {estados.map((estado) => (
                        <SelectItem key={estado.id} value={estado.id}>
                          {estado.nome}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>

              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {selectedCidade
                        ? cidades.find((cidade) => cidade.id === selectedCidade)
                            ?.nome
                        : "Selecione uma cidade..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Pesquisa Cidades" />
                      <CommandList>
                        <CommandEmpty>Cidade não encontrada.</CommandEmpty>
                        <CommandGroup>
                          {cidades &&
                            cidades.map((cidade) => (
                              <CommandItem
                                key={cidade.id}
                                value={cidade.id}
                                onSelect={(currentValue) => {
                                  setSelectedCidade(currentValue);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    cidade.id === selectedCidade
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {cidade.nome}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            </div>
          </div>
          <Button type="submit">Continuar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormAddress;
