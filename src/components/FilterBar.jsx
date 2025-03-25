import { useState } from "react";
import "../styles/FilterBar.css";

/* Componente FilterBar:
   - Permite al usuario establecer filtros para refinar la lista de videojuegos.
   - Los filtros incluyen: nombre, año, género, plataforma, tag y desarrollador.
   - Usa un estado local (`filters`) para almacenar los valores de cada campo.
   - Al enviar el formulario, llama a `onFilterChange` con un objeto que contiene 
     únicamente los campos con valores no vacíos, evitando enviar parámetros vacíos a la API.
*/

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    year: "",
    genre: "",
    platform: "",
    tag: "",
    developer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Solo se envían los filtros con valores no vacíos
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    );
    onFilterChange(activeFilters);
  };

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" value={filters.name} onChange={handleChange} />
      <input type="number" name="year" placeholder="Año" value={filters.year} onChange={handleChange} />
      <input type="text" name="genre" placeholder="Género" value={filters.genre} onChange={handleChange} />
      <input type="text" name="platform" placeholder="Plataforma" value={filters.platform} onChange={handleChange} />
      <input type="text" name="tag" placeholder="Tag" value={filters.tag} onChange={handleChange} />
      <input type="text" name="developer" placeholder="Desarrollador" value={filters.developer} onChange={handleChange} />
      <button type="submit">Filtrar</button>
    </form>
  );
};

export default FilterBar;