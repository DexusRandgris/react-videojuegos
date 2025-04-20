import { useEffect, useState } from "react";
import { fetchGames } from "../services/api";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    year: "",
    genre: "",
    platform: "",
    tag: "",
    developer: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // Filtramos solo los parámetros con valores no vacíos
        const filteredParams = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value.trim() !== "")
        );

        // Construimos los parámetros, siempre agregando 'search' si hay término
        const params = {
          ...filteredParams,
          ...(searchQuery.trim() !== "" ? { search: searchQuery } : {}),
        };

        const data = await fetchGames(params);
        // Si se aplicó algún filtro o búsqueda, deduplicamos la lista por 'name'
        if (Object.keys(filteredParams).length > 0 || searchQuery.trim() !== "") {
          const uniqueGames = Array.from(new Map(data.map(game => [game.name, game])).values());
          setGames(uniqueGames);
        } else {
          // Al entrar al sitio sin filtros, se muestran todos los juegos por defecto
          setGames(data || []);
        }
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setGames([]);
      }
    };
    // Llamamos a la función fetchData para obtener los juegos
    // y aplicamos los filtros y búsqueda si es necesario
    fetchData();
  }, [filters, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  // Separa la lógica de búsqueda y filtrado en un solo lugar
  // para que sea más fácil de entender y mantener.
  return (
    <div className="home-container">
      <h1>Videojuegos Más Populares Según Metacritic</h1>
      <SearchBar onSearch={setSearchQuery} />

      <button
        className="toggle-filters-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
      </button>

      {showFilters && (
        <div className="filter-submenu">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
      )}

      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-item">
            <Link to={`/game/${game.id}`}>
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


// En esta solución, se utiliza la función useEffect para realizar 
// la petición a la API de videojuegos cada vez que se renderiza la página 
// Home. Se utiliza el estado videojuegos para almacenar la lista de 
// videojuegos obtenidos de la API. Se crea un componente SearchBar para 
// permitir al usuario buscar videojuegos, y se envía la búsqueda al componente Home para 
// que se actualice la lista de video
// luego sincronicé con mucho esfuerzo el filtro y funcionó loko