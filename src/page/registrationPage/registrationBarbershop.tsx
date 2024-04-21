import FormCadastroBarbershop from "@/components/form/FormCadastroBarbershop";
import Header from "@/components/header/headerRegistration";

const registrationBarbershop = () => {
  return (
    <>
      
      <Header />
      <div className="px-12 py-12">
        <FormCadastroBarbershop />
      </div>
    </>
  );
};

export default registrationBarbershop;
