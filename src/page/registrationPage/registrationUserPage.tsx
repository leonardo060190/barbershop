import FormCadastroUser from "../../components/form/FormCadastroUser";
import Header from "../../components/header/headerRegistration" 

const registrationPage = () => {
  return (
    <>
    <Header/>
      <div className="px-12 py-12">
        <FormCadastroUser />
      </div>
    </>
  );
};

export default registrationPage;
