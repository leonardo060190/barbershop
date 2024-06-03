import FormAddress from "@/components/form/FormAddress";
import FormCadastroBarbershop from "@/components/form/FormCadastroBarbershop";
import FormCadastroLogin from "@/components/form/FormCadastroLogin";
import Header from "@/components/header/headerRegistration";
import { useState } from "react";

const RegistrationBarbershop = () => {

  const [currentStep, setCurrentStep] = useState(1)
  
  const handleAddressSave = () =>{
    setCurrentStep(2);
  };

  const handleBarbershopSave = () => {
    setCurrentStep(3);
  };

  return (
    <>
      <Header />
      <div className="px-16 py-12 mb-10">
      {currentStep === 1 && (
          <FormAddress onSave={handleAddressSave} />
        )}
        {currentStep === 2 && (
          <FormCadastroBarbershop onSave={handleBarbershopSave} />
        )}
        {currentStep === 3 && (
          <FormCadastroLogin />
        )}
      </div>
    </>
  );
};

export default RegistrationBarbershop;
