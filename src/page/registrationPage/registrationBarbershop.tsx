import FormAddress from "@/components/form/FormAddress";
import FormCadastroBarbershop from "@/components/form/FormCadastroBarbershop";
import Header from "@/components/header/headerRegistration";
import { useState } from "react";

const RegistrationBarbershop = () => {

  const [isAddressSaved, setIsAddressSaved] = useState(false);

  const handleAddressSave = () =>{
    setIsAddressSaved(true);
  };

  return (
    <>
      <Header />
      <div className="px-16 py-12 mb-10">
        {!isAddressSaved ? (
          <FormAddress onSave={handleAddressSave}/>
        ):(
            <FormCadastroBarbershop />
        )}
        
      
      </div>
    </>
  );
};

export default RegistrationBarbershop;
