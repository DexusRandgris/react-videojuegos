import { Link } from "react-router-dom";
import "../styles/Header.css"; // Importamos el archivo de estilos

const Header = () => {
  return (
    <nav className="header">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/detalle">Detalles</Link></li>
      </ul>
    </nav>
  );
};

export default Header;