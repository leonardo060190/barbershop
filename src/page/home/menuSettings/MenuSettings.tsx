import TelefoneRender from "../cadastroTelefoneCliente/TelefoneRender";

interface MenuSettingsProps {
  idCliente: string;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({ idCliente }) => {
  return (
    <>
      <div className="py-1 px-4">
        <TelefoneRender idCliente={idCliente}/>
      </div>
    </>
  );
};

export default MenuSettings;
