import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { api } from "../../../config/ConfigAxios";

type FormValues = {
  numero: string;
};

const FormTelefone = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário
 
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    if (!window.confirm("Confirma o Casdastro ?")) {
      return;
    }
    try {
      const response = await api.post("/telefone", {
        ...data,
      });
      console.log(response.data);
      limparFormulario();
    } catch (error) {
      console.error("Erro cadastro", error);
    }
  };


  //função para formatar o cpf
  const formatTelefone = (value: string) => {
    value = value.replace(/\D/g, "");
    
    value = value.slice(0, 11)

    let formattedValue = "";
    for (let i = 0; i < value.length; i++){
      if (i === 0 ){
        formattedValue += "( ";
      }else if (i === 2 ){
        formattedValue += " ) "
      }else if (i === 7 ){
        formattedValue += " - "
      }
      formattedValue += value[i];
    }
    return formattedValue;
  };


  const limparFormulario = () => {
    reset({
      numero: "",
    });
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
                  {...register("numero", {
                    required: "O número do telefone é requerido",
                    onChange: (e) => setValue("numero", formatTelefone(e.target.value)),

                  })}
                />
              </FormControl>
              {errors.numero && (
                <p className="text-red-500">{errors.numero.message}</p>
              )}
            </FormItem>
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormTelefone;
