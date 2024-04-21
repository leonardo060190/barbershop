import { LogInIcon } from "lucide-react";
import { SheetClose, SheetFooter } from "../../ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const FormLogin = () => {
  const methods = useForm<FormValues>();

  const { handleSubmit, register } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // Aqui você pode acessar os dados do formulário
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
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              className="col-span-3"
              placeholder="Digite sua senha"
              {...register("password", { required: "Password is required" })}
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
