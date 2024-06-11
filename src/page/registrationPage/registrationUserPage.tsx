import FormCadastroClienteLogin from "@/components/form/FormCadastroClienteLogin";
import FormCadastroUser from "../../components/form/FormCadastroUser";
import Header from "../../components/header/headerRegistration";
import { useState } from "react";

const RegistrationUser = () => {
  const [clientId, setClientId] = useState<number | null>(null);
  const [isCadastroUser, setIsCadastroUser] = useState(false);

  const handleCadastroUser = (id: number | null) => {
    if (id !== null) {
      setClientId(id);
    }
    setIsCadastroUser(true);
  };

  return (
    <>
      <Header />
      <div className=" px-16 py-12 mb-10">
        {!isCadastroUser && !clientId? (
          <FormCadastroUser onSave={handleCadastroUser} />
        ) : (
          <FormCadastroClienteLogin cliente={clientId}/>
        )}
      </div>
    </>
  );
};

export default RegistrationUser;
