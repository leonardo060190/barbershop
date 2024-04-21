import FormCadastroBarbershop from "@/components/form/FormCadastroBarbershop";
import Header from "@/components/header/headerRegistration";

const registrationBarbershop = () => {
  return (
    <>
      
      <Header />
      <div className="px-16 py-12 mb-10">
        <FormCadastroBarbershop />
      </div>
    </>
  );
};

export default registrationBarbershop;
