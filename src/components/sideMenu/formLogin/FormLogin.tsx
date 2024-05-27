import { LogInIcon } from "lucide-react";
import { SheetClose, SheetFooter } from "../../ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { useAuth } from "@/components/authProvider/AuthProvider";
// import { api } from "../../../../config/ConfigAxios";

type FormValues = {
  email: string;
  senha: string;
};

const FormLogin = () => {
  const methods = useForm<FormValues>();
  // const { login } = useAuth();

  const { handleSubmit, register } = methods;

  const onSubmit: SubmitHandler<FormValues> = async(data) => {
    console.log(data);

//     if(data.email.trim() === "" || data.senha.trim() === ""){
//       return;
//     }
//     try {
//       const response = await api.post("/login",{
//         ...data
//       });
//       if (response.status === 200) {
//         login();
//     } else {
//         alert("Usuário ou senha inválidos!");
//     }
// } catch (error) {
//     alert("Erro ao tentar logar. Tente novamente mais tarde.");
// }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4 px-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input
              id="email"
              className="col-span-3"
              placeholder="Digite se E-mail"
              {...register("email", { required: "O e-mail é requerido!" })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="senha" className="text-right">
              Senha
            </Label>
            <Input
              id="senha"
              className="col-span-3"
              placeholder="Digite sua senha"
              {...register("senha", { required: "A senha é requerida!" })}
            />
          </div>

          <SheetFooter className="text-left border-b border-solid flex justify-end sm:flex-row sm:justify-end border-secondary p-5">
            <SheetClose asChild className="px-4 mb-4">
              <Button type="submit" className="gap-3">
                <LogInIcon size={16} />
                Entrar
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormLogin;
