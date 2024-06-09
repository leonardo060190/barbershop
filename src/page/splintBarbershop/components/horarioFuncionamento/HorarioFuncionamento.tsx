interface DiaSemanaProps {
  inicio: string;
  fim: string;
}

const HorarioFuncionamento: React.FC<DiaSemanaProps> = ({ inicio, fim }) => {
  return (
    <div>
     
        <div className="flex items-center">
          <span className="text-sm flex gap-2 items-center">{inicio}</span>
          <span className="text-sm flex gap-2 items-center">-</span>
          <span className="text-sm flex gap-2 items-center">{fim}</span>
        </div>
      
    </div>
  );
};

export default HorarioFuncionamento;
