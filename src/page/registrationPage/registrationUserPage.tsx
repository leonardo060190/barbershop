import FormCadastroLogin from "@/components/form/FormCadastroLogin";
import FormCadastroUser from "../../components/form/FormCadastroUser";
import Header from "../../components/header/headerRegistration";
import { useState } from "react";

const RegistrationUser = () => {

  const [isCadastroUser, setIsCadastroUser] = useState(false);

  const handleCadastroUser = () =>{
    setIsCadastroUser(true);
  }

  return (
    <>
      <Header />
      <div className=" px-16 py-12 mb-10">
      {!isCadastroUser ? (
          <FormCadastroUser onSave={handleCadastroUser}/>
        ):(
            <FormCadastroLogin />
        )}
     
      </div>
    </>
  );
};

export default RegistrationUser;
