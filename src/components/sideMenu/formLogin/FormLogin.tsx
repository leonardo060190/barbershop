import { EyeIcon, EyeOffIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/components/authProvider/AuthProvider";
import { api } from "../../../../config/ConfigAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  senha: string;
};

interface FormLoginProps {
  onLoginSuccess: () => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onLoginSuccess }) => {
  const methods = useForm<FormValues>();
  const { autenticado, login, logout } = useAuth();
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    if (data.email.trim() === "" || data.senha.trim() === "") {
      return;
    }
    try {
      const response = await api.post("/login/authenticade", {
        ...data,
      });
      if (response.status === 200) {
        login();
        limpaFormulario();
        onLoginSuccess();
      } else {
        alert("Usuário ou senha inválidos!");
      }
    } catch (error) {
      alert("Erro ao tentar logar. Tente novamente mais tarde.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    logout();
    onLoginSuccess();
    navigate("/");
  };

  const limpaFormulario = () =>{
    reset({
      email: "",
      senha: "",
    })
  }

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
              type="text"
              className="col-span-3"
              placeholder="Digite se E-mail"
              {...register("email", { required: "O e-mail é requerido!" })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="senha" className="text-right">
              Senha
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="senha"
                type={showPassword ? "text" : "password"}
                className="col-span-3"
                placeholder="Digite sua senha"
                {...register("senha", { required: "A senha é requerida!" })}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </div>
            </div>
          </div>

          <div className="text-left border-b border-solid flex justify-end sm:flex-row sm:justify-end border-secondary p-5">
            {autenticado ? (
              <Button onClick={handleLogout} className="gap-3">
                <LogOutIcon size={16} />
                Sair
              </Button>
            ) : (
              <Button type="submit" className="gap-3">
                <LogInIcon size={16} />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormLogin;
