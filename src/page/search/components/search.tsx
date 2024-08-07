"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/authProvider/AuthProvider";

type FormValues = {
  nome: string;
};

const SearchComponent = () => {
  const { autenticado } = useAuth();
  const methods = useForm<FormValues>();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = methods;

  const filtrarLista = async () => {
    const campos = getValues();
    navigate(`/search-results/${campos.nome}`);
    reset({ nome: "" });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(filtrarLista)}>
          <div className="flex items-center gap-2">
            <Input
              className="outline-0"
              type="text"
              placeholder="Buscar Barbearia"
              {...register("nome", { required: "Campo obrigatório." })}
            />
            {autenticado ? (
              <Button variant="default" type="submit">
                <Search />
              </Button>
            ) : (
              <Button variant="default" type="submit" disabled>
                <Search />
              </Button>
            )}
          </div>
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}{" "}
        </form>
      </FormProvider>
    </div>
  );
};

export default SearchComponent;
