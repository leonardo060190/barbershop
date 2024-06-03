"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { api } from "../../../../config/ConfigAxios";
import { useState } from "react";

type FormValues = {
  nome: string;
};

const SearchComponent = () => {
  const methods = useForm<FormValues>();
  const [barbershops, setBarbershops] = useState([]);

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = methods;

  const filtrarLista = async () => {
    const campos = getValues();
    try {
      const response = await api.get(`/barbearias/search/${campos.nome}`);
      const data = response.data;
      console.log(data);
      if (data.length) {
        setBarbershops(data);
        limpaFormulario();
      } else {
        alert("Não há produtos cadastrados com a palavra chave pesquisada");
      }
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados`);
    }
  };

  const limpaFormulario = () =>{
    reset({
      nome: ""
    });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(filtrarLista)}>
          <div className="flex items-center gap-2">
            <Input
              className="outline-0"
              type="text"
              placeholder="Buscar Barbearias"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            <Button variant="default" type="submit">
              <Search />
            </Button>
          </div>
          {errors.nome && (
              <p className="text-red-500">{errors.nome.message}</p>
            )}        </form>
      </FormProvider>
    </div>
  );
};

export default SearchComponent;
