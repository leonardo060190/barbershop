import FormCadastroUser from "../../components/form/FormCadastroUser";
import Header from "../../components/header/headerRegistration" 

const RegistrationUser = () => {
  return (
    <>
    <Header/>
      <div className=" px-16 py-12 mb-10">
        <FormCadastroUser />
      </div>
    </>
  );
};

export default RegistrationUser;
