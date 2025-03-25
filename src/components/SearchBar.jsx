import { useState } from "react";
import "../styles/SearchBar.css";

/* Componente SearchBar:
   - Permite al usuario ingresar un término de búsqueda.
   - Usa un estado local (`query`) para almacenar lo que se escribe.
   - Al enviar el formulario (ya sea pulsando Enter o haciendo clic en el botón "Buscar"),
     se llama a la función `onSearch` (proporcionada por el componente padre) para actualizar
     el estado de búsqueda en Home.
*/
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar videojuegos..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;