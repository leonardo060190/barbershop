import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const FormCadastroUser = () => {
  const methods = useForm<FormValues>(); // Obter métodos e estado do formulário

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // Aqui você pode acessar os dados do formulário
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
          </FormControl>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </FormControl>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
            />
          </FormControl>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default FormCadastroUser;
