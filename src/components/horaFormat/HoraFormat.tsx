import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const HoraFormat = () => {
  return (
    <div className="text-sm">
          <p className="capitalize">{format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  } )}</p>
    </div>
  )
}

export default HoraFormat