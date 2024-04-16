import { useForm } from "react-hook-form";

const UserForm = () => {
  const { register } = useForm();

  return (
    <>
      <form>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            placeholder="Digite o nome"
            required
            autoFocus
            {...register("nome")}
          />
        </div>
        <div>
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            type="text"
            className="form-control"
            id="sobrenome"
            placeholder="Digite o sobrenome"
            required
            {...register("sobrenome")}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Informe o e-mail"
            required
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            className="form-control"
            maxLength={8}
            id="senha"
            placeholder="Digite uma senha"
            required
            {...register("senha")}
          />
        </div>
      </form>
      <div className="alert"></div>
    </>
  );
};

export default UserForm;
