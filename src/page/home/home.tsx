
import { format } from "date-fns";
import Header from "../../components/header";
import { ptBR } from "date-fns/locale";

const home = () => {
  return (
  <div>
  <Header />

  <h2>Olá, Leonardo</h2>

  <p className="capitalize">{format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  } )}</p>

  </div>
)
};

export default home;
