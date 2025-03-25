import "../styles/GameList.css"; // Importamos los estilos
import { Link } from "react-router-dom"; // Importar Link para la navegación
/*lista para los juegos*/
const GameList = ({ games }) => {
  return (
    <div className="game-list">
      {games.map((game) => (
        <div className="game-item" key={game.id}>
          <img src={game.background_image} alt={game.name} />
          <h3>
            <Link to={`/game/${game.id}`}>{game.name}</Link> {/* Enlace al detalle */}
          </h3>
          <p>Género: {game.genre}</p>
          <p>Puntuación: {game.metacritic}</p>
        </div>
      ))}
    </div>
  );
};

export default GameList;