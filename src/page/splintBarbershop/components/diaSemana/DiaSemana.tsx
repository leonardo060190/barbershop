interface DiaSemanaProps {
  id: string
  nome: string;
}

const DiaSemana: React.FC<DiaSemanaProps> = ({ nome }) => {
  return (
    <div>
      <div className="flex  items-center">
        <span className="text-sm flex gap-2 items-center">{nome}</span>
      </div>
    </div>
  );
};

export default DiaSemana;
